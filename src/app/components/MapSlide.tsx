"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, X } from "lucide-react"

const locations = [
    {
        id: 1,
        title: "Where we first met ✨",
        desc: "The place where everything changed forever.",
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
        x: 30,
        y: 40
    },
    {
        id: 2,
        title: "Our First Date ☕",
        desc: "Nervous smiles and endless conversation.",
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", // placeholder
        x: 60,
        y: 30
    },
    {
        id: 3,
        title: "Our Favorite Place 🌅",
        desc: "Where we go to escape the world together.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
        x: 45,
        y: 70
    }
]

export default function MapSlide() {
    const [activeLocation, setActiveLocation] = useState<typeof locations[0] | null>(null)

    return (
        <div className="w-full h-full bg-[#f8f1f1] relative overflow-hidden flex flex-col items-center">

            {/* Background stylized map image (blurred or subtle) */}
            <div
                className="absolute inset-0 opacity-15 pointer-events-none grayscale"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-pink-100/80 to-transparent pointer-events-none z-0" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-12 md:pt-16 z-10 relative pointer-events-none"
            >
                <h2 className="font-serif text-4xl lg:text-5xl text-rose-600 mb-3 tracking-wide font-medium">
                    Our Special Places
                </h2>
                <p className="text-rose-400 font-sans text-lg">
                    Click the pins on the map
                </p>
            </motion.div>

            {/* Pins Area */}
            <div className="flex-1 w-full max-w-4xl relative z-10">
                {locations.map((loc, i) => (
                    <motion.button
                        key={loc.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.2), type: "spring", bounce: 0.5 }}
                        className="absolute flex flex-col items-center group cursor-pointer"
                        style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -100%)" }}
                        onClick={() => setActiveLocation(loc)}
                        whileHover={{ scale: 1.1, zIndex: 20 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="bg-rose-500 text-white p-3 rounded-full shadow-[0_5px_15px_rgba(244,63,94,0.4)] relative">
                            <MapPin size={24} fill="currentColor" />
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-50 -z-10" />
                        </div>
                        <span className="mt-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-rose-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {loc.title}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Location Modal */}
            <AnimatePresence>
                {activeLocation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/10 backdrop-blur-md"
                        onClick={() => setActiveLocation(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveLocation(null)}
                                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors z-10 hidden md:block" // The top space works for mobile clicking outside too
                            >
                                <X size={20} />
                            </button>

                            <div className="h-64 sm:h-72 w-full overflow-hidden relative group">
                                <img
                                    src={activeLocation.img}
                                    alt={activeLocation.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            <div className="p-6 relative bg-white">
                                <div className="absolute -top-8 right-6 bg-rose-500 text-white p-3 rounded-full shadow-lg">
                                    <MapPin size={24} fill="currentColor" />
                                </div>
                                <h3 className="font-serif text-2xl text-gray-800 mb-2 mt-2">{activeLocation.title}</h3>
                                <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">
                                    {activeLocation.desc}
                                </p>
                                <button
                                    onClick={() => setActiveLocation(null)}
                                    className="w-full mt-6 py-3 bg-rose-50 text-rose-600 rounded-xl font-medium hover:bg-rose-100 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="absolute bottom-10 text-rose-400 font-sans text-sm tracking-widest uppercase animate-pulse">
                Scroll down for next level
            </p>

        </div>
    )
}
