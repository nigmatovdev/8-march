"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const memories = [
    {
        id: 1,
        caption: "Our first coffee together ☕",
        img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        caption: "That unforgettable walk 🍃",
        img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        caption: "The moment I knew ❤️",
        img: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?auto=format&fit=crop&q=80&w=800"
    }
]

export default function GuessMemorySlide() {
    const [revealed, setRevealed] = useState<number[]>([])

    const handleReveal = (id: number) => {
        if (!revealed.includes(id)) {
            setRevealed(prev => [...prev, id])
        }
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col items-center justify-center p-6 lg:p-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10"
            >
                <h2 className="font-serif text-4xl text-rose-600 mb-3 tracking-wide">
                    Guess the Memory
                </h2>
                <p className="text-rose-400 font-sans text-lg">
                    Tap the photos to reveal our moments
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl h-3/5 lg:h-2/3">
                {memories.map((memory, index) => {
                    const isRevealed = revealed.includes(memory.id)

                    return (
                        <motion.div
                            key={memory.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            onClick={() => handleReveal(memory.id)}
                            className="flex-1 relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-lg group"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") handleReveal(memory.id)
                            }}
                            aria-label={isRevealed ? memory.caption : "Guess this memory"}
                        >
                            {/* Image */}
                            <motion.img
                                src={memory.img}
                                alt="Memory"
                                animate={{ filter: isRevealed ? "blur(0px)" : "blur(16px) brightness(0.8)", scale: isRevealed ? 1.05 : 1 }}
                                transition={{ duration: 1 }}
                                className="w-full h-full object-cover absolute inset-0 transition-transform"
                            />

                            {/* Overlay for unrevealed state */}
                            <AnimatePresence>
                                {!isRevealed && (
                                    <motion.div
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-rose-900/10 backdrop-blur-sm z-10"
                                    >
                                        <span className="text-white text-6xl drop-shadow-lg opacity-80 mb-4">?</span>
                                        <span className="text-white font-serif text-xl tracking-wider drop-shadow-md">
                                            Can you guess?
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Caption Overlay for Revealed State */}
                            <AnimatePresence>
                                {isRevealed && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-20"
                                    >
                                        <p className="text-white font-serif text-xl md:text-2xl text-center drop-shadow-md">
                                            {memory.caption}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    )
                })}
            </div>

            {revealed.length === memories.length && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mt-10 text-rose-500 font-sans tracking-widest uppercase animate-pulse"
                >
                    Scroll down for next level
                </motion.p>
            )}
        </div>
    )
}
