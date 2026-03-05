"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Music, VolumeX } from "lucide-react"
import IntroSlide from "./components/IntroSlide"
import StorySlide from "./components/StorySlide"
import GuessMemorySlide from "./components/GuessMemorySlide"
import CounterSlide from "./components/CounterSlide"
import CatchHeartSlide from "./components/CatchHeartSlide"
import RandomMemorySlide from "./components/RandomMemorySlide"
import HiddenNotesSlide from "./components/HiddenNotesSlide"
import MapSlide from "./components/MapSlide"
import ChatSlide from "./components/ChatSlide"
import FinalSurpriseSlide from "./components/FinalSurpriseSlide"

const PlaceholderSlide = ({ index }: { index: number }) => (
  <div className="flex h-full items-center justify-center font-serif text-3xl text-pink-600">
    Building Slide {index}...
  </div>
)

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasUnlocked, setHasUnlocked] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const totalSlides = 10

  const touchStartY = useRef(0)
  const isScrolling = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const goToNext = () => {
    if (!hasUnlocked && currentSlide === 0) return
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  }

  const goToPrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return
      isScrolling.current = true
      setTimeout(() => { isScrolling.current = false }, 1000)

      if (e.deltaY > 15) goToNext()
      else if (e.deltaY < -15) goToPrev()
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return
      const touchEndY = e.changedTouches[0].clientY
      const change = touchStartY.current - touchEndY

      if (Math.abs(change) > 40) {
        isScrolling.current = true
        setTimeout(() => { isScrolling.current = false }, 1000)

        if (change > 0) goToNext()
        else goToPrev()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSlide, hasUnlocked])

  const handleToggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.warn("Audio play blocked by browser:", e))
      }
    }
    setIsMusicPlaying(!isMusicPlaying)
  }

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <IntroSlide onUnlock={() => { setHasUnlocked(true); goToNext() }} />
      case 1: return <StorySlide />
      case 2: return <GuessMemorySlide />
      case 3: return <CounterSlide />
      case 4: return <CatchHeartSlide />
      case 5: return <RandomMemorySlide />
      case 6: return <HiddenNotesSlide />
      case 7: return <MapSlide />
      case 8: return <ChatSlide />
      case 9: return <FinalSurpriseSlide />
      default: return <PlaceholderSlide index={currentSlide} />
    }
  }

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden text-gray-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Music Toggle */}
      <button
        onClick={handleToggleMusic}
        className="absolute top-6 right-6 p-3 bg-white/40 backdrop-blur-md rounded-full shadow-sm text-pink-600 z-50 hover:bg-white/60 transition-colors"
        aria-label="Toggle Music"
        tabIndex={0}
      >
        {isMusicPlaying ? <Music size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Slide Indicators */}
      {hasUnlocked && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 hidden md:flex">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`w-2 transition-all duration-500 rounded-full ${currentSlide === i ? "bg-pink-600 h-8" : "bg-pink-300/50 h-2"}`}
            />
          ))}
        </div>
      )}

      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/romantic-piano.mp3"
        loop
      />
    </main>
  )
}
