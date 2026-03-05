"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Search } from "lucide-react"

const notes = [
    { id: 1, text: "I love your beautiful smile ✨", x: 15, y: 25 },
    { id: 2, text: "I love your endless kindness 🌸", x: 80, y: 15 },
    { id: 3, text: "I love the way you laugh 🎵", x: 20, y: 75 },
    { id: 4, text: "I love our future together 🏡", x: 70, y: 80 },
    { id: 5, text: "I love how you make me feel ❤️", x: 50, y: 50 }
]

export default function HiddenNotesSlide() {
    const [foundNotes, setFoundNotes] = useState<number[]>([])
    const [activePopup, setActivePopup] = useState<{ id: number; text: string } | null>(null)

    const handleFind = (note: { id: number; text: string }) => {
        setActivePopup({ id: note.id, text: note.text })
        if (!foundNotes.includes(note.id)) {
            setFoundNotes(prev => [...prev, note.id])
        }
    }

    const closePopup = () => setActivePopup(null)

    return (
        <div className="w-full h-full bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-50 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ec4899 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-16 z-10 relative pointer-events-none"
            >
                <h2 className="font-serif text-4xl lg:text-5xl text-rose-600 mb-4 tracking-wide font-medium flex items-center justify-center gap-3">
                    <Search size={32} className="text-pink-400" />
                    Easter Egg Hunt
                </h2>
                <p className="text-rose-400 font-sans text-lg">
                    Find the {notes.length} hidden love notes
                </p>
                <p className="text-pink-500 font-bold mt-2 font-sans tracking-widest bg-white/50 inline-block px-4 py-1 rounded-full">{foundNotes.length} / {notes.length} Found</p>
            </motion.div>

            {/* Hidden Notes */}
            {notes.map(note => {
                const isFound = foundNotes.includes(note.id)
                return (
                    <motion.button
                        key={note.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: note.id * 0.2, type: "spring" }}
                        onClick={() => handleFind(note)}
                        className="absolute z-20"
                        style={{ left: `${note.x}%`, top: `${note.y}%`, transform: 'translate(-50%, -50%)' }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Hidden Love Note"
                    >
                        <motion.div
                            animate={{
                                scale: isFound ? 1 : [1, 1.2, 1],
                            }}
                            transition={{ repeat: isFound ? 0 : Infinity, duration: 1.5 + (note.id * 0.1) }}
                        >
                            <Heart
                                size={32}
                                className={`transition-colors duration-500 drop-shadow-md ${isFound ? 'text-rose-400/50 fill-rose-300' : 'text-rose-500 fill-rose-500 cursor-pointer'}`}
                            />
                        </motion.div>
                    </motion.button>
                )
            })}

            {/* Popup Modal */}
            <AnimatePresence>
                {activePopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-rose-900/20 backdrop-blur-sm p-4"
                        onClick={closePopup}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 w-full max-w-sm shadow-2xl border border-rose-100/50 flex flex-col items-center text-center relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute -top-6 bg-pink-500 rounded-full p-3 shadow-lg text-white">
                                <Heart fill="currentColor" size={24} className="animate-pulse" />
                            </div>

                            <p className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed mt-4 italic">"{activePopup.text}"</p>

                            <button
                                onClick={closePopup}
                                className="mt-8 px-8 py-3 bg-rose-100 text-rose-600 rounded-full font-sans font-medium hover:bg-rose-200 transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Completion Text */}
            <AnimatePresence>
                {foundNotes.length === notes.length && !activePopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none"
                    >
                        <p className="text-rose-500 font-sans tracking-widest uppercase animate-pulse font-medium bg-white/60 px-6 py-2 rounded-full">
                            Scroll down for next level
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
