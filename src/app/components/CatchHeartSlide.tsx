"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

type FallingHeart = {
    id: number
    x: number // percentage 0-100
    y: number // percentage 0-100
    speed: number
}

export default function CatchHeartSlide() {
    const [score, setScore] = useState(0)
    const [hearts, setHearts] = useState<FallingHeart[]>([])
    const [isWon, setIsWon] = useState(false)
    const [basketX, setBasketX] = useState(50) // percentage 0-100

    const containerRef = useRef<HTMLDivElement>(null)
    const requestRef = useRef<number>(0)
    const heartIdCounter = useRef(0)

    // Spawner
    useEffect(() => {
        if (isWon) return
        const spawnTimer = setInterval(() => {
            setHearts(prev => {
                if (prev.length > 5) return prev // Max 5 at a time
                return [
                    ...prev,
                    {
                        id: ++heartIdCounter.current,
                        x: Math.random() * 80 + 10, // 10% to 90%
                        y: -10,
                        speed: Math.random() * 0.5 + 0.3 // speed factor
                    }
                ]
            })
        }, 1000)
        return () => clearInterval(spawnTimer)
    }, [isWon])

    // Game Loop
    useEffect(() => {
        if (isWon) return

        const updateGame = () => {
            setHearts(prev => {
                let newHearts = [...prev]

                for (let i = newHearts.length - 1; i >= 0; i--) {
                    const h = newHearts[i]
                    h.y += h.speed

                    // Check collision
                    // Basket is at y ~ 85%, width ~ 20%
                    const inCatchZone = h.y > 80 && h.y < 95
                    const inHorizontalBounds = Math.abs(h.x - basketX) < 15

                    if (inCatchZone && inHorizontalBounds) {
                        setScore(s => {
                            const newScore = s + 1
                            if (newScore >= 10) setIsWon(true)
                            return newScore
                        })
                        newHearts.splice(i, 1) // caught
                        continue
                    }

                    if (h.y > 110) {
                        newHearts.splice(i, 1) // missed
                    }
                }
                return newHearts
            })
            requestRef.current = requestAnimationFrame(updateGame)
        }

        requestRef.current = requestAnimationFrame(updateGame)
        return () => cancelAnimationFrame(requestRef.current)
    }, [basketX, isWon])

    // Mouse / Touch movement tracking
    const handleMove = (clientX: number) => {
        if (!containerRef.current || isWon) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((clientX - rect.left) / rect.width) * 100
        setBasketX(Math.max(5, Math.min(95, x)))
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-gradient-to-b from-blue-50 to-pink-100 relative overflow-hidden"
            onMouseMove={(e) => handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
            {/* HUD */}
            <div className="absolute top-10 left-0 right-0 z-20 flex flex-col items-center">
                <h2 className="font-serif text-3xl md:text-4xl text-rose-600 tracking-wide mb-2 drop-shadow-sm">
                    Catch My Heart
                </h2>

                {/* Progress Bar */}
                <div className="w-64 h-4 bg-white/50 rounded-full overflow-hidden border border-rose-200">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                        animate={{ width: `${(score / 10) * 100}%` }}
                        transition={{ type: "spring", bounce: 0 }}
                    />
                </div>
                <p className="text-rose-500 font-sans mt-2 font-medium">
                    {score} / 10
                </p>
            </div>

            {/* Falling Hearts */}
            {!isWon && hearts.map(h => (
                <div
                    key={h.id}
                    className="absolute"
                    style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <Heart size={36} fill="#ec4899" className="text-pink-600 drop-shadow-md border-white/50 animate-pulse" />
                </div>
            ))}

            {/* Basket */}
            {!isWon && (
                <div
                    className="absolute bottom-[10%] w-24 h-24 md:w-32 md:h-32 transition-transform ease-out duration-75 text-5xl md:text-6xl flex justify-center items-end select-none pointer-events-none drop-shadow-xl"
                    style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
                >
                    🧺
                </div>
            )}

            {/* Winning Screen */}
            <AnimatePresence>
                {isWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-pink-100/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mb-6 bg-white p-6 rounded-full shadow-xl"
                        >
                            <Heart size={64} fill="#e11d48" className="text-rose-600" />
                        </motion.div>

                        <h3 className="font-serif text-4xl md:text-5xl text-rose-600 mb-4 tracking-wide font-medium">
                            You caught my heart ❤️
                        </h3>

                        <p className="text-rose-500 font-sans text-lg tracking-widest uppercase mt-8 animate-bounce">
                            Scroll down to continue
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
