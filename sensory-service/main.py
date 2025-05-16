from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sensory_service import SensoryScorer

app = FastAPI()

# 👇 Allow your React frontend to access this API
origins = [
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Only allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)

scorer = SensoryScorer()

@app.get("/api/sensory-analysis")
async def get_analysis(lat: float, lon: float):
    """Automatically fetch place_id and return sensory analysis."""
    try:
        place_id = scorer.places_client.get_place_id(lat, lon)
        return scorer.get_sensory_scores(lat, lon, place_id)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to get place_id or sensory data: {str(e)}"
        )
