"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { Gift, Heart } from "lucide-react"

export default function FinalSurpriseSlide() {
    const [opened, setOpened] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
    const [yesClicked, setYesClicked] = useState(false)

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    const handleNoHover = () => {
        // Generate random coordinates within a range
        const newX = (Math.random() - 0.5) * 300 // -150 to 150
        const newY = (Math.random() - 0.5) * 300
        setNoButtonPos({ x: newX, y: newY })
    }

    return (
        <div className="w-full h-full bg-gradient-to-b from-rose-50 to-pink-100 flex flex-col items-center justify-center relative overflow-hidden p-4">

            {opened && !yesClicked && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={true}
                    numberOfPieces={200}
                    gravity={0.05}
                    colors={['#f43f5e', '#ec4899', '#fdf2f8', '#fda4af', '#fff1f2']}
                />
            )}

            {/* Floating background hearts */}
            {opened && !yesClicked && Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: windowSize.height, x: Math.random() * windowSize.width, opacity: 0, scale: Math.random() * 1.5 + 0.5 }}
                    animate={{ y: -100, opacity: [0, 1, 0] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                    className="absolute z-0 text-rose-300"
                >
                    <Heart size={32} fill="currentColor" />
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                {!opened ? (
                    <motion.div
                        key="gift-box"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center z-10"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            onClick={() => setOpened(true)}
                            className="bg-white/80 backdrop-blur border border-rose-100 p-8 rounded-full shadow-[0_20px_50px_rgba(244,63,94,0.3)] mb-8 group"
                        >
                            <Gift size={100} className="text-rose-500 group-hover:text-rose-600 transition-colors" />
                        </motion.button>
                        <h2 className="font-serif text-3xl md:text-5xl text-rose-600 tracking-wide">
                            Open Your Surprise 🎁
                        </h2>
                    </motion.div>
                ) : !yesClicked ? (
                    <motion.div
                        key="surprise-msg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex flex-col items-center text-center z-20 max-w-2xl px-6 bg-white/60 backdrop-blur-md py-12 rounded-3xl border border-white/50 shadow-2xl"
                    >
                        <h1 className="font-serif text-5xl md:text-6xl text-rose-600 mb-6 tracking-wide leading-tight">
                            Happy 8 March <br /><span className="italic">Nafisa 🌸</span>
                        </h1>

                        <p className="text-gray-700 font-sans text-lg md:text-xl leading-relaxed mb-6">
                            You are the most amazing woman in my life.<br />
                            Thank you for every moment, every smile, and every memory.<br />
                            I can't wait for our future together.
                        </p>

                        <p className="text-xl md:text-2xl font-serif text-rose-500 font-medium mb-12">
                            I love you ❤️
                        </p>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent my-8" />

                        <h3 className="text-2xl font-sans font-medium text-gray-800 mb-8">
                            Will You Always Stay With Me?
                        </h3>

                        <div className="flex gap-6 items-center justify-center relative w-full h-20">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setYesClicked(true)}
                                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold rounded-full shadow-lg text-lg z-30 ring-4 ring-rose-100"
                            >
                                YES ❤️
                            </motion.button>

                            <motion.button
                                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                onMouseEnter={handleNoHover}
                                onClick={handleNoHover}
                                className="absolute right-0 md:relative px-8 py-4 bg-gray-200 text-gray-500 font-bold rounded-full shadow-sm text-lg z-30"
                                style={{ marginLeft: noButtonPos.x === 0 ? "1rem" : 0 }}
                            >
                                NO 💔
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="final-yes"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="flex flex-col items-center text-center z-30"
                    >
                        <div className="bg-white p-10 rounded-full shadow-2xl mb-8 flex items-center justify-center">
                            <Heart size={120} className="text-rose-500 fill-rose-500 animate-pulse" />
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl text-rose-600 tracking-wide drop-shadow-sm">
                            I KNEW IT! 🥰
                        </h1>
                        <p className="text-rose-400 font-sans text-xl mt-6 tracking-widest uppercase font-medium">
                            Forever & Always
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
