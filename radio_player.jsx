import { useState, useRef, useEffect } from 'react'
import { Maximize2, Volume2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function RadioPlayer({ station }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card className={`fixed z-50 p-4 ${isFullscreen ? 'inset-0' : 'bottom-4 right-4 w-[320px]'}`}>      
      <CardContent className="flex flex-col gap-2">
        <div className="text-lg font-semibold text-blue-300 truncate">{station.name}</div>
        <audio ref={audioRef} src={station.url_resolved} preload="auto" />
        <div className="flex items-center justify-between">
          <button onClick={togglePlay} className="bg-blue-700 px-3 py-1 rounded-full text-white">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex items-center gap-2">
            <Volume2 size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          <button onClick={toggleFullscreen} className="text-blue-400">
            <Maximize2 size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
