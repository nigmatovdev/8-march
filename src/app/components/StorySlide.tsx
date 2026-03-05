"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const stories = [
    {
        id: 1,
        text: "The day we met...",
        img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        text: "I didn't know yet that you would change my life.",
        img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        text: "But here we are today ❤️",
        img: "https://images.unsplash.com/photo-1621217631557-013143c683b5?auto=format&fit=crop&q=80&w=800",
    }
]

export default function StorySlide() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < stories.length - 1) {
                setCurrentIndex(prev => prev + 1)
            }
        }, 4500)

        return () => clearTimeout(timer)
    }, [currentIndex])

    const handleNext = () => {
        if (currentIndex < stories.length - 1) setCurrentIndex(prev => prev + 1)
    }

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
    }

    return (
        <div className="relative w-full h-full bg-stone-900 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Blur */}
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={`bg-${currentIndex}`}
                    src={stories[currentIndex].img}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            <div className="relative w-full max-w-md h-full flex flex-col pt-12 pb-8 px-4">
                {/* Progress Bars */}
                <div className="flex gap-2 w-full mb-6 z-20">
                    {stories.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: currentIndex > idx ? "100%" : "0%" }}
                                animate={{ width: currentIndex === idx ? "100%" : currentIndex > idx ? "100%" : "0%" }}
                                transition={{ duration: currentIndex === idx ? 4.5 : 0, ease: "linear" }}
                                className="h-full bg-white"
                            />
                        </div>
                    ))}
                </div>

                {/* Content Card */}
                <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl z-10 flex items-center justify-center bg-black border border-white/10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0"
                        >
                            <img src={stories[currentIndex].img} alt="Memory" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-12 left-6 right-6 text-center">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white font-serif text-2xl lg:text-3xl font-medium tracking-wide drop-shadow-md"
                                >
                                    {stories[currentIndex].text}
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Invisible Touch Zones */}
                    <div className="absolute inset-y-0 left-0 w-1/3 z-30" onClick={handlePrev} />
                    <div className="absolute inset-y-0 right-0 w-2/3 z-30" onClick={handleNext} />
                </div>

                {/* Hint for global swipe */}
                <p className="text-white/50 text-center mt-6 text-sm font-sans animate-bounce tracking-widest hidden md:block">
                    Scroll down for next level
                </p>
            </div>
        </div>
    )
}
