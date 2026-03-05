"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import IntroSlide from "./components/IntroSlide"
import GuessMemorySlide from "./components/GuessMemorySlide"
import CounterSlide from "./components/CounterSlide"
import CatchHeartSlide from "./components/CatchHeartSlide"
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
  const totalSlides = 8 // Reduced from 9
  const [completedSlides, setCompletedSlides] = useState<number[]>([])

  const touchStartY = useRef(0)
  const isScrolling = useRef(false)

  const markCompleted = (index: number) => {
    setCompletedSlides(prev => prev.includes(index) ? prev : [...prev, index])
  }

  const canGoNext = () => {
    if (currentSlide === 0) return hasUnlocked;
    const slidesThatRequireCompletion = [1, 3, 4, 6]; // GuessMemory, CatchHeart, HiddenNotes, Chat

    // If the slide requires interaction, it must be completed before going next
    if (slidesThatRequireCompletion.includes(currentSlide)) {
      return completedSlides.includes(currentSlide);
    }

    return true; // Non-interactive slides can be skipped anytime
  }

  const goToNext = () => {
    if (!canGoNext()) return
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

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <IntroSlide onUnlock={() => { setHasUnlocked(true); goToNext() }} />
      case 1: return <GuessMemorySlide onComplete={() => markCompleted(1)} onNext={goToNext} />
      case 2: return <CounterSlide onNext={goToNext} />
      case 3: return <CatchHeartSlide onComplete={() => markCompleted(3)} onNext={goToNext} />
      case 4: return <HiddenNotesSlide onComplete={() => markCompleted(4)} onNext={goToNext} />
      case 5: return <MapSlide onNext={goToNext} />
      case 6: return <ChatSlide onComplete={() => markCompleted(6)} onNext={goToNext} />
      case 7: return <FinalSurpriseSlide />
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

    </main>
  )
}
