import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [radio, setRadio] = useState([]);
  const [satellites, setSatellites] = useState([]);
  const [address, setAddress] = useState("");
  const [news, setNews] = useState(null);
  const [proMode, setProMode] = useState(false);
  const [denied, setDenied] = useState(false);

  // Ask for location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => setDenied(true)
    );
  }, []);

  // Fetch data when location is available
  useEffect(() => {
    if (!location) return;

    const fetchAll = async () => {
      try {
        const sysRes = await axios.get(`/api/system-info`, { params: location });
        const radRes = await axios.get("/api/radio-stations");
        const satRes = await axios.post("/api/satellites", location);
        const addrRes = await axios.get("/api/address", { params: location });
        const newsRes = await axios.get("/api/news");

        setSystemInfo(sysRes.data);
        setRadio(radRes.data);
        setSatellites(satRes.data.above || []);
        setAddress(addrRes.data.address);
        setNews(newsRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    fetchAll();
  }, [location]);

  const togglePro = () => {
    setProMode(!proMode);
  };

  if (denied) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-red-600 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-2">Location Required</h1>
        <p>This app requires access to your general location to function.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
        >
          Reload and Allow Access
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold">TactixStation</h1>
        <button
          onClick={togglePro}
          className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm"
        >
          {proMode ? "Pro Mode: On" : "Switch to Pro Mode"}
        </button>
      </div>

      {systemInfo && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">System Info</h2>
          <p><strong>IPv4:</strong> {systemInfo.ip.ipv4}</p>
          <p><strong>Temperature:</strong> {systemInfo.weather.temp_c}°C / {systemInfo.weather.temp_f}°F</p>
          <p><strong>Condition:</strong> {systemInfo.weather.condition}</p>
          <p><strong>Wind:</strong> {systemInfo.weather.wind_speed} m/s</p>
          <p><strong>Moon Phase:</strong> {systemInfo.moon_phase}</p>
          <p><strong>Location:</strong> {address}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Radio Stations</h2>
        {radio.map((r, i) => (
          <div key={i} className="mb-1">
            🎧 <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {r.name} ({r.country})
            </a>
          </div>
        ))}
      </div>

      {satellites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Satellites Overhead</h2>
          <ul className="list-disc list-inside">
            {satellites.slice(0, 5).map((sat, i) => (
              <li key={i}>
                {sat.satname} (ID: {sat.satid}) - {sat.intDesignator}
              </li>
            ))}
          </ul>
        </div>
      )}

      {news && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">News</h2>
          <p><strong>{news.headline}</strong></p>
          <small>{news.timestamp}</small>
        </div>
      )}

      <div className="border-t pt-4 text-sm text-gray-600">
        <p>📡 Plan: {proMode ? "Pro (Offline Backend)" : "Free (Online)"}</p>
        <p>📊 Data Usage: Coming soon</p>
      </div>
    </div>
  );
}
