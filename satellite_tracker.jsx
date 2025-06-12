import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const issIcon = new L.Icon({
  iconUrl: '/icons/satellite.svg',
  iconSize: [35, 35],
})

export default function SatelliteTracker() {
  const [position, setPosition] = useState([0, 0])

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch('/api/satellites')
        const data = await res.json()
        if (data && data.iss_position) {
          setPosition([data.iss_position.latitude, data.iss_position.longitude])
        }
      } catch (e) {
        console.error('Failed to fetch satellite data', e)
      }
    }
    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <MapContainer center={position} zoom={3} className="h-[400px] w-full rounded-xl">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} icon={issIcon}>
        <Popup>ISS Location<br />Lat: {position[0].toFixed(2)}<br />Lng: {position[1].toFixed(2)}</Popup>
      </Marker>
    </MapContainer>
  )
}
