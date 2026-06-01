import { useEffect, useRef, useState } from 'react'

const TRACKS = {
  menu:   '/music/menu.mp3',
  easy:   '/music/facil.mp3',
  normal: '/music/medio.mp3',
  hard:   '/music/dificl.mp3',
  gameover: '/music/perder.mp3',
}

function getTrack(screen, difficulty) {
  if (screen === 'menu')     return TRACKS.menu
  if (screen === 'gameover') return TRACKS.gameover
  return TRACKS[difficulty] ?? TRACKS.normal
}

export function useMusic(screen, difficulty) {
  const audioRef  = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const src = getTrack(screen, difficulty)

    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.loop   = true
      audioRef.current.volume = 0.5
    } else if (audioRef.current.src !== new URL(src, window.location.href).href) {
      audioRef.current.pause()
      audioRef.current.src  = src
      audioRef.current.currentTime = 0
    }

    audioRef.current.muted = muted
    audioRef.current.play().catch(() => {})

    return () => {
      audioRef.current?.pause()
    }
  }, [screen, difficulty])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const toggleMute = () => setMuted(m => !m)

  return { muted, toggleMute }
}

export default useMusic
