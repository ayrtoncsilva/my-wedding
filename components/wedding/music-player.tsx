"use client"

import { useEffect, useRef, useState } from "react"

const playlist = [
  "/audio/02.mp3",
  "/audio/03.mp3",
  "/audio/04.mp3",
  "/audio/05.mp3",
  "/audio/06.mp3",
  "/audio/07.mp3",
  "/audio/08.mp3",
  "/audio/09.mp3",
]

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  // autoplay mutado (permitido)
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.25
    audioRef.current.muted = true
    audioRef.current.play().catch(() => {})
  }, [trackIndex])

  // PRIMEIRA interação global (igual ao código que funcionava)
  useEffect(() => {
    function unlockOnFirstInteraction() {
      if (!audioRef.current || started) return

      audioRef.current.muted = false
      audioRef.current
        .play()
        .then(() => {
          setStarted(true)
          setPlaying(true)
        })
        .catch(() => {})

      window.removeEventListener("pointerdown", unlockOnFirstInteraction)
    }

    window.addEventListener("pointerdown", unlockOnFirstInteraction)

    return () =>
      window.removeEventListener("pointerdown", unlockOnFirstInteraction)
  }, [started])

  function togglePlay() {
    if (!audioRef.current || !started) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function nextTrack() {
    setTrackIndex((prev) => (prev + 1) % playlist.length)
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[trackIndex]}
        onEnded={nextTrack}
        preload="auto"
      />

      {/* BOTÃO DISCRETO */}
      <button
        onClick={togglePlay}
        aria-label="Controle de música"
        className="
          fixed bottom-6 right-6
          z-[99999]
          flex h-9 w-9 items-center justify-center
          rounded-full
          bg-white/70 text-black
          backdrop-blur
          transition hover:bg-white
        "
      >
        {!started ? "🎵" : playing ? "🔊" : "🔈"}
      </button>
    </>
  )
}
