"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Shuffle } from "lucide-react"

const randomMemories = [
    {
        id: 1,
        text: "The moment I realized you were special.",
        img: "https://images.unsplash.com/photo-1510048651030-cbcfefbe4bc7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        text: "Our first long walk together.",
        img: "https://images.unsplash.com/photo-1502444330042-d1a1df277579?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        text: "The day I fell even more in love.",
        img: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        text: "Laughing until our stomachs hurt.",
        img: "https://images.unsplash.com/photo-1444439121658-006ee85b130a?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        text: "When you looked at me and everything made sense.",
        img: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800"
    }
]

export default function RandomMemorySlide() {
    const [currentIdx, setCurrentIdx] = useState<number | null>(null)

    const handleRandomize = () => {
        let nextIndex
        do {
            nextIndex = Math.floor(Math.random() * randomMemories.length)
        } while (nextIndex === currentIdx && randomMemories.length > 1)
        setCurrentIdx(nextIndex)
    }

    const memory = currentIdx !== null ? randomMemories[currentIdx] : null

    return (
        <div className="w-full h-full bg-[#fdf2f8] flex flex-col justify-center items-center px-6 py-12">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10 z-20"
            >
                <h2 className="font-serif text-4xl lg:text-5xl text-rose-600 mb-4 tracking-wide font-medium">
                    Random Memories
                </h2>
                <p className="text-rose-400 font-sans text-lg">
                    Click the button to relive a random moment
                </p>
            </motion.div>

            <div className="flex-1 w-full max-w-lg mb-8 relative flex items-center justify-center perspective-[1000px]">
                <AnimatePresence mode="wait">
                    {memory ? (
                        <motion.div
                            key={memory.id}
                            initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                            exit={{ opacity: 0, rotateY: -90, scale: 0.9 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 flex flex-col"
                        >
                            <div className="flex-1 relative overflow-hidden">
                                <img
                                    src={memory.img}
                                    alt="Random memory"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                            <div className="p-8 bg-gradient-to-t from-white via-white to-rose-50/20">
                                <p className="text-center font-serif text-2xl text-gray-800 leading-relaxed italic">
                                    "{memory.text}"
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full border-2 border-dashed border-rose-200 rounded-3xl flex flex-col items-center justify-center p-10 bg-white/50"
                        >
                            <Sparkles className="text-rose-300 w-16 h-16 mb-4 animate-pulse" />
                            <p className="text-rose-400 text-center font-sans tracking-widest uppercase">
                                Ready when you are
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRandomize}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-sans font-semibold shadow-[0_10px_30px_-10px_rgba(244,63,94,0.6)] flex items-center gap-3 active:bg-rose-600 transition-shadow z-20"
                tabIndex={0}
            >
                <Shuffle size={20} />
                <span className="tracking-wide">Show Me A Memory</span>
            </motion.button>
        </div>
    )
}
