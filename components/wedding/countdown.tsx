"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: string
}

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime()

  if (difference <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
  }

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  }
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: "Dias", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Min", value: timeLeft.minutos },
    { label: "Seg", value: timeLeft.segundos },
  ]

  return (
    <div className="mt-4 flex items-center gap-3 md:gap-6">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm md:h-20 md:w-20">
              <span className="font-serif text-3xl font-light text-white md:text-4xl">
                {mounted ? String(unit.value).padStart(2, "0") : "--"}
              </span>
            </div>
            <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mb-4 text-lg font-light text-[#ffad9e]/40">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
