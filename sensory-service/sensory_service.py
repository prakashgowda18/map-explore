from datetime import datetime
from typing import Dict
from sensory_engine import SensoryAnalyzer
from api_clients import GooglePlacesClient, WeatherAPI, AirQualityAPI

class SensoryScorer:
    def __init__(self):
        self.analyzer = SensoryAnalyzer()
        self.places_client = GooglePlacesClient()
        self.weather_api = WeatherAPI()
        self.air_api = AirQualityAPI()

    def get_sensory_scores(self, lat: float, lon: float, place_id: str) -> Dict:
        """Get complete sensory analysis for a location"""
        # Get all raw data
        reviews = [r['text'] for r in self.places_client.get_reviews(place_id)]
        weather = self.weather_api.get_current(lat, lon)
        aqi = self.air_api.get_aqi(lat, lon)
        now = datetime.now()

        # Analyze reviews
        review_analysis = self.analyzer.analyze_reviews(reviews)

        # Calculate scores
        return {
            'timestamp': now.isoformat(),
            'scores': {
                'noise': self._calculate_noise_score(review_analysis['noise'], now),
                'light': self._calculate_light_score(review_analysis['light'], weather, now),
                'crowd': self._calculate_crowd_score(review_analysis['crowd'], now),
                'pollution': self._calculate_pollution_score(aqi)
            },
            'metadata': {
                'review_count': len(reviews),
                'weather_condition': weather['code']
            }
        }

    def _calculate_noise_score(self, analysis: Dict, time: datetime) -> Dict:
        """Calculate noise score (0-100)"""
        base_score = min(100, max(0,
            analysis['weighted_score'] * 10 +  # 10 points per weighted mention
            self._time_factor(time, peak_weight=1.5) * 20
        ))
       
        return {
            'score': round(base_score),
            'level': self._score_to_level(base_score),
            'components': {
                'positive_mentions': analysis['positive'],
                'negative_mentions': analysis['negative'],
                'time_factor': self._time_factor(time)
            }
        }

    def _calculate_light_score(self, analysis: Dict, weather: Dict, time: datetime) -> Dict:
        """Calculate light sensitivity score"""
        daylight = self._daylight_factor(time)
        weather_modifier = 1.3 if weather['code'] in [800, 801] else 1.0  # Clear sky boost
       
        base_score = min(100, max(0,
            analysis['weighted_score'] * 8 +  # 8 points per weighted mention
            daylight * 0.6 * 100 * weather_modifier
        ))
       
        return {
            'score': round(base_score),
            'level': self._score_to_level(base_score),
            'components': {
                'daylight_factor': daylight,
                'weather_modifier': weather_modifier
            }
        }

    def _calculate_crowd_score(self, analysis: Dict, time: datetime) -> Dict:
        """Calculate crowd score"""
        time_factor = self._time_factor(time, evening_weight=2.0)
        day_factor = 1.5 if time.weekday() >= 5 else 1.0  # Weekend boost
       
        base_score = min(100, max(0,
            analysis['weighted_score'] * 12 * time_factor * day_factor
        ))
       
        return {
            'score': round(base_score),
            'level': self._score_to_level(base_score),
            'components': {
                'weekend_boost': day_factor > 1,
                'time_factor': time_factor
            }
        }

    def _calculate_pollution_score(self, aqi: float) -> Dict:
        """Direct AQI mapping"""
        return {
            'score': min(100, aqi),
            'level': self._score_to_level(aqi),
            'components': {
                'aqi': aqi
            }
        }

    def _time_factor(self, time: datetime,
                    peak_weight: float = 1.3,
                    evening_weight: float = 1.5) -> float:
        """Time-based multiplier"""
        hour = time.hour
        if 8 <= hour <= 10:  # Morning peak
            return peak_weight
        elif 17 <= hour <= 19:  # Evening peak
            return evening_weight
        elif 20 <= hour <= 23:  # Night
            return 1.2
        return 1.0

    def _daylight_factor(self, time: datetime) -> float:
        """Calculate daylight intensity (0-1)"""
        hour = time.hour
        # Simple approximation - could use suncalc for precise values
        return max(0, min(1,
            0.5 * (1 + (12 - abs(hour - 12)) / 6  # Peaks at noon
        )))

    def _score_to_level(self, score: float) -> str:
        """Convert score to human-readable level"""
        if score >= 70:
            return 'high'
        elif score >= 30:
            return 'medium'
        return 'low'