"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Heart } from "lucide-react"

export default function IntroSlide({ onUnlock }: { onUnlock: () => void }) {
    const [isHolding, setIsHolding] = useState(false)
    const [progress, setProgress] = useState(0)
    const holdTimer = useRef<NodeJS.Timeout | null>(null)
    const controls = useAnimation()

    const handlePointerDown = () => {
        setIsHolding(true)
        controls.start({
            scale: 1.1,
            transition: { duration: 3, ease: "linear" }
        })
    }

    const handlePointerUp = () => {
        setIsHolding(false)
        controls.stop()
        controls.start({ scale: 1, transition: { type: "spring", stiffness: 300 } })

        setProgress((p) => {
            if (p < 100) return 0
            return p
        })

        if (holdTimer.current) {
            clearInterval(holdTimer.current)
            holdTimer.current = null
        }
    }

    useEffect(() => {
        if (isHolding) {
            const interval = 30 // update every 30ms
            const totalTime = 3000 // 3 seconds

            holdTimer.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + (interval / totalTime) * 100
                    return next >= 100 ? 100 : next
                })
            }, interval)
        }

        return () => {
            if (holdTimer.current) clearInterval(holdTimer.current)
        }
    }, [isHolding])

    useEffect(() => {
        if (progress >= 100) {
            handlePointerUp()
            onUnlock()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress])

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-pink-50 via-white to-rose-50 select-none">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
            >
                <h1 className="font-serif text-5xl md:text-6xl text-rose-600 mb-4 tracking-wide">
                    Nafisa
                </h1>
                <p className="text-rose-400 font-sans text-lg md:text-xl font-light tracking-widest uppercase">
                    Happy 8 March 🌸
                </p>
            </motion.div>

            <div className="relative flex flex-col items-center">
                <motion.div
                    animate={controls}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    // Support for touch devices
                    onTouchStart={handlePointerDown}
                    onTouchEnd={handlePointerUp}
                    className="relative group cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label="Hold to unlock our story"
                >
                    {/* Base Background Heart */}
                    <Heart size={140} className="text-rose-100/50 stroke-rose-200 stroke-1" fill="currentColor" />

                    {/* Filling Heart using clip-path */}
                    <Heart
                        size={140}
                        className="text-rose-500 absolute top-0 left-0 drop-shadow-md"
                        fill="currentColor"
                        style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    />

                    {/* Glowing pulse behind heart when not holding */}
                    {!isHolding && progress === 0 && (
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-rose-400 rounded-full -z-10 blur-2xl"
                        />
                    )}
                </motion.div>

                <motion.p
                    animate={{ opacity: isHolding ? 1 : 0.6 }}
                    className="mt-12 text-rose-500 font-sans text-sm md:text-base font-medium uppercase tracking-widest text-center"
                >
                    {isHolding ? "Filling with love ❤️" : "Press and Hold to Start Our Story"}
                </motion.p>
            </div>
        </div>
    )
}
