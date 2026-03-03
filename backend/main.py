from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import random
from datetime import datetime
import os

app = FastAPI(title="Global Weather API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CITIES = [
    {"name": "New York", "country": "USA", "flag": "🇺🇸", "icon": "🗽", "temp_range": (-5, 35), "humidity_range": (40, 80)},
    {"name": "London", "country": "UK", "flag": "🇬🇧", "icon": "🎡", "temp_range": (0, 25), "humidity_range": (55, 85)},
    {"name": "Tokyo", "country": "Japan", "flag": "🇯🇵", "icon": "🗼", "temp_range": (5, 38), "humidity_range": (50, 80)},
    {"name": "Sydney", "country": "Australia", "flag": "🇦🇺", "icon": "🦘", "temp_range": (10, 40), "humidity_range": (45, 75)},
    {"name": "Dubai", "country": "UAE", "flag": "🇦🇪", "icon": "🏙️", "temp_range": (20, 48), "humidity_range": (30, 70)},
    {"name": "Ahmedabad", "country": "India", "flag": "🇮🇳", "icon": "🪁", "temp_range": (22, 42), "humidity_range": (35, 75)},
]

CONDITIONS = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Thunderstorm", "Windy", "Foggy"]


def make_weather(city: dict) -> dict:
    temp = round(random.uniform(*city["temp_range"]), 1)
    humidity = random.randint(*city["humidity_range"])
    condition = random.choice(CONDITIONS)
    return {
        "name": city["name"],
        "country": city["country"],
        "flag": city["flag"],
        "icon": city["icon"],
        "temperature": temp,
        "humidity": humidity,
        "condition": condition,
        "wind_speed": round(random.uniform(5, 50), 1),
        "uv_index": random.randint(1, 11),
        "feels_like": round(temp + random.uniform(-3, 3), 1),
        "last_updated": datetime.now().strftime("%H:%M:%S"),
    }


@app.get("/api/weather")
def get_all_weather():
    return {
        "cities": [make_weather(city) for city in CITIES],
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/api/weather/{city_name}")
def get_city_weather(city_name: str):
    city = next((c for c in CITIES if c["name"].lower() == city_name.lower()), None)
    if not city:
        return {"error": "City not found"}
    return make_weather(city)


@app.get("/health")
def health():
    return {"status": "ok"}


# Serve React frontend (must come after all API routes)
if os.path.exists("build"):
    app.mount("/", StaticFiles(directory="build", html=True), name="static")
