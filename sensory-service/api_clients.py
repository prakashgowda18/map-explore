import os
import requests
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()
class GooglePlacesClient:
    def get_place_id(self, lat: float, lon: float) -> str:
        """Get place_id from coordinates using Google's reverse geocoding."""
        url = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {
            'latlng': f"{lat},{lon}",
            'key': os.getenv('GOOGLE_PLACES_KEY')
        }
        response = requests.get(url, params=params)
        results = response.json().get('results', [])
        
        if not results:
            raise ValueError("No place found for these coordinates")
        
        # Get the most relevant result (usually the first one)
        return results[0]['place_id']
    def get_reviews(self, place_id: str) -> List[Dict]:
        """Get reviews for a specific place"""
        url = f"https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            'place_id': place_id,
            'fields': 'review',
            'key': os.getenv('GOOGLE_PLACES_KEY')
        }
        response = requests.get(url, params=params)
        return response.json().get('result', {}).get('reviews', [])

class WeatherAPI:
    def get_current(self, lat: float, lon: float) -> Dict:
        """Get current weather conditions"""
        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': os.getenv('OWM_API_KEY'),
            'units': 'metric'
        }
        response = requests.get(url, params=params)
        print("Weather API Response:", response.json())
        
        data = response.json()
        return {
            'code': response.json()['weather'][0]['id'],
            'temp': response.json()['main']['temp']
        }

class AirQualityAPI:
    def get_aqi(self, lat: float, lon: float) -> float:
        """Get current air quality index"""
        url = "https://api.airvisual.com/v2/nearest_city"
        params = {
            'lat': lat,
            'lon': lon,
            'key': os.getenv('AIRVISUAL_KEY')
        }
        response = requests.get(url, params=params)
        return response.json()['data']['current']['pollution']['aqius']