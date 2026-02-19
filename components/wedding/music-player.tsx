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

function isMobileDevice() {
  if (typeof navigator === "undefined") return false
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // detecta mobile
  useEffect(() => {
    setIsMobile(isMobileDevice())
  }, [])

  // DESKTOP: inicia na primeira interação global
  useEffect(() => {
    if (isMobile) return
    if (!audioRef.current) return

    function unlockDesktopAudio() {
      audioRef.current!.volume = 0.25
      audioRef.current!
        .play()
        .then(() => {
          setStarted(true)
          setPlaying(true)
        })
        .catch(() => {})

      window.removeEventListener("pointerdown", unlockDesktopAudio)
      window.removeEventListener("scroll", unlockDesktopAudio)
    }

    window.addEventListener("pointerdown", unlockDesktopAudio)
    window.addEventListener("scroll", unlockDesktopAudio)

    return () => {
      window.removeEventListener("pointerdown", unlockDesktopAudio)
      window.removeEventListener("scroll", unlockDesktopAudio)
    }
  }, [isMobile])

  // MOBILE: botão inicia
  function handleButtonClick() {
    if (!audioRef.current) return

    audioRef.current.volume = 0.25

    if (!started) {
      audioRef.current
        .play()
        .then(() => {
          setStarted(true)
          setPlaying(true)
        })
        .catch(() => {})
      return
    }

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

      {/* BOTÃO — aparece SEMPRE, mas só é obrigatório no mobile */}
      <button
        onClick={handleButtonClick}
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
