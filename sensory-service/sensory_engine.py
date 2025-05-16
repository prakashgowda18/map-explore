import os
from datetime import datetime
from typing import Dict, List, Tuple
import requests
from textblob import TextBlob

class SensoryAnalyzer:
    def __init__(self):
        self.negation_words = {'not', 'no', 'never', 'none', 'hardly'}
        self.intensifiers = {'very', 'extremely', 'really', 'too', 'super'}
       
        # Trigger words with custom weights
        self.triggers = {
            'noise': {
                'words': ['noisy', 'loud', 'sound', 'music', 'volume'],
                'base_weight': 1.0
            },
            'light': {
                'words': ['bright', 'lighting', 'glare', 'dim', 'dark'],
                'base_weight': 0.8  
            },
            'crowd': {
                'words': ['crowded', 'busy', 'packed', 'full'],
                'base_weight': 1.2
            }
        }

    def analyze_reviews(self, reviews: List[str]) -> Dict[str, Dict]:
        """Analyze reviews with sentiment and context awareness"""
        results = {trigger: {
            'positive': 0,
            'negative': 0,
            'neutral': 0,
            'weighted_score': 0
        } for trigger in self.triggers}
       
        for review in reviews:
            sentences = self._split_sentences(review)
            for sentence in sentences:
                for trigger, config in self.triggers.items():
                    matches = self._find_trigger_matches(sentence, config['words'])
                    if not matches:
                        continue
                       
                    sentiment = self._analyze_sentence(sentence, matches)
                    self._update_results(results[trigger], sentiment)
       
        return results
   
    def _split_sentences(self, text: str) -> List[str]:
        """Split text into sentences while preserving context"""
        return [s.strip() for s in text.replace('!', '.').replace('?', '.').split('.') if s]

    def _find_trigger_matches(self, sentence: str, trigger_words: List[str]) -> List[Tuple[str, int]]:
        """Find trigger words with their positions"""
        lower_sentence = sentence.lower()
        return [
            (word, lower_sentence.find(word))
            for word in trigger_words
            if word in lower_sentence
        ]

    def _analyze_sentence(self, sentence: str, matches: List[Tuple[str, int]]) -> Dict:
        """Analyze sentence context and sentiment"""
        # Get overall sentiment
        polarity = TextBlob(sentence).sentiment.polarity
       
        # Check context for each match
        weighted_score = 0
        for word, pos in matches:
            # Check for negations
            if self._has_negation(sentence[:pos]):
                polarity = min(-0.2, polarity)  # Force negative
               
            # Check for intensifiers
            intensity = 1.5 if self._has_intensifier(sentence[:pos]) else 1.0
           
            # Adjust score based on context
            weighted_score += self._weight_sentiment(polarity) * intensity
       
        return {
            'polarity': polarity,
            'weighted_score': weighted_score / len(matches)  # Average per trigger
        }

    def _has_negation(self, text_before: str) -> bool:
        """Check for negation patterns"""
        words = text_before.lower().split()[-3:]  # Check last 3 words
        return any(word in self.negation_words for word in words)

    def _has_intensifier(self, text_before: str) -> bool:
        """Check for intensifiers"""
        words = text_before.lower().split()[-3:]
        return any(word in self.intensifiers for word in words)

    def _weight_sentiment(self, polarity: float) -> float:
        """Convert sentiment to weighted score"""
        if polarity > 0.2:   # Positive: 1.0
            return 1.0
        elif polarity < -0.2: # Negative: -0.8
            return -0.8
        else:                 # Neutral: 0.3
            return 0.3

    def _update_results(self, results: Dict, sentiment: Dict):
        """Update analysis results"""
        if sentiment['polarity'] > 0.2:
            results['positive'] += 1
        elif sentiment['polarity'] < -0.2:
            results['negative'] += 1
        else:
            results['neutral'] += 1
           
        results['weighted_score'] += sentiment['weighted_score']