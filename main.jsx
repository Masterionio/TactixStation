import App from './app'
import RadioPlayer from './radio_player'
import SatelliteTracker from './satellite_tracker'
import stations from './data/stations.json'

export default function Main() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <App />
      <SatelliteTracker />
      <RadioPlayer station={stations[0]} />
    </div>
  )
}
