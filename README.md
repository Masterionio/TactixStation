# TactixStation
# TactixStation

Futuristic radio + satellite tracking web app powered by FastAPI & React.

---

## 🌐 Features

### 🔄 Loading Screen
- 12-second animated loading (4s for Pro)
- Module loading feedback (radio, satellites, weather, etc.)

### 📍 Location Access
- Custom location access prompt
- General worldwide geolocation (not Kuwait-only)
- App locks if denied, with Reload button

### ⚙️ Settings Menu
- **Switch to Pro Mode** toggle
- Theme selection (Dark/Light/Futuristic)
- Auto-start audio player
- Update frequency (5s or ultra-fast Pro mode)
- View data usage and plan (Free or Pro)

### 📊 System Info
- IPv4 and IPv6 detection
- General address & local geolocation
- Weather data (Temp, wind, conditions)
- Moon phase & local time

### 📻 Radio Player
- Top 5 international stations:
  - WNYC FM
  - BBC World Service
  - NPR News
  - Radio France Inter
  - Classical WQXR
- Draggable player with fullscreen
- HTML5 audio with controls + station info

### 🛰 Satellite Tracking
- Tracks ISS + NOAA + METEOR M2 in real-time
- Starlink visible in Pro mode
- Realtime position, elevation, altitude

### 🗺 Interactive Map (Leaflet + OSM)
- Dark-themed futuristic map
- User location marker
- Radio and satellite icons with popups

### 🧠 AI Agent (Pro only)
- Scrapes local news
- Analyzes satellite behavior
- Instant updates on conditions

---

## 🧩 Backend (FastAPI)
- `/api/system-info` – IP, weather, moon, time
- `/api/radio-stations` – 5 top streaming stations
- `/api/satellites` – ISS, weather satellites, Starlink (Pro)
- `/api/address` – address from coordinates
- `/api/news` – local headlines
- `/api/data-usage` – returns usage + plan
- N2YO, OpenWeatherMap, IP Geolocation, OSM Nominatim integration

---

## 🖥 Frontend (React + Tailwind CSS)
- Responsive futuristic design
- Mobile-first experience
- Smooth transitions + dark blue theme
- Tabs: Radio • Satellites • Info

---

## ✅ Pro Version Perks
- Uses custom backend – no Wi-Fi required
- Real-time ultra-fast updates (0.01ns)
- UHD map + 4K native audio/video
- AI Agent
- Starlink + GNSS access
- Cellular data usage and plan dashboard

---

## ✅ Requirements
- Node.js + npm
- Python 3.11+
- GitHub Pages or local deployment (frontend)
- Uvicorn/FastAPI backend

---

> Fully ready for GitHub deployment. Clean architecture, scalable APIs, and dynamic frontend integration.
