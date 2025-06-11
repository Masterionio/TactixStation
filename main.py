from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx, os, socket
import asyncio

from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="TactixStation API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables
N2YO_API_KEY = os.getenv("N2YO_API_KEY")
WEATHER_API = os.getenv("WEATHER_API")
IPINFO_TOKEN = os.getenv("IPINFO_TOKEN")

# --------- Models ---------
class Location(BaseModel):
    lat: float
    lon: float

# --------- Utilities ---------
async def get_ip():
    hostname = socket.gethostname()
    ipv4 = socket.gethostbyname(hostname)
    return {"ipv4": ipv4, "ipv6": "::1"}

async def get_weather(lat: float, lon: float):
    async with httpx.AsyncClient() as client:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={WEATHER_API}&units=metric"
        r = await client.get(url)
        r.raise_for_status()
        data = r.json()
        return {
            "temp_c": data["main"]["temp"],
            "temp_f": round((data["main"]["temp"] * 9 / 5) + 32, 2),
            "condition": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"]
        }

async def get_moon_phase():
    # Simplified calculation
    from datetime import datetime
    day_of_year = datetime.utcnow().timetuple().tm_yday
    moon_phase = (day_of_year % 29.53) / 29.53
    return round(moon_phase, 2)

# --------- API Endpoints ---------
@app.get("/api/system-info")
async def system_info(lat: float = 0.0, lon: float = 0.0):
    ip = await get_ip()
    weather = await get_weather(lat, lon)
    moon = await get_moon_phase()
    return {
        "ip": ip,
        "location": {"lat": lat, "lon": lon},
        "weather": weather,
        "moon_phase": moon
    }

@app.get("/api/radio-stations")
async def radio_stations():
    try:
        async with httpx.AsyncClient() as client:
            url = "https://de1.api.radio-browser.info/json/stations/topclick/5"
            res = await client.get(url)
            res.raise_for_status()
            return res.json()
    except Exception:
        return [
            {
                "name": "WNYC FM",
                "url": "https://fm939.wnyc.org/wnycfm",
                "country": "USA",
                "language": "English",
                "bitrate": 128
            },
            {
                "name": "BBC World Service",
                "url": "http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-eieuk",
                "country": "UK",
                "language": "English",
                "bitrate": 96
            }
        ]

@app.post("/api/satellites")
async def satellite_data(loc: Location):
    url = (
        f"https://api.n2yo.com/rest/v1/satellite/above/"
        f"{loc.lat}/{loc.lon}/0/90/18/&apiKey={N2YO_API_KEY}"
    )
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        res.raise_for_status()
        return res.json()

@app.get("/api/address")
async def reverse_geocode(lat: float, lon: float):
    try:
        url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            res.raise_for_status()
            data = res.json()
            return {"address": data.get("display_name", "Unknown")}
    except:
        raise HTTPException(status_code=500, detail="Failed to fetch address.")

@app.get("/api/news")
async def get_news():
    return {
        "headline": "Local news support coming soon!",
        "timestamp": "real-time AI agent planned in Pro version"
    }

# --------- Health Check ---------
@app.get("/")
def root():
    return {"status": "TactixStation backend is running!"}
