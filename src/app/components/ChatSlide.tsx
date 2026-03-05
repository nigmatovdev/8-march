"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Battery, Wifi, Signal, ChevronLeft } from "lucide-react"

const chatScript = [
    { id: 1, sender: "me", text: "Hey 🌸" },
    { id: 2, sender: "her", text: "Hi! 😊" },
    { id: 3, sender: "me", text: "Do you believe in destiny?" },
    { id: 4, sender: "her", text: "Maybe... why?" },
    { id: 5, sender: "me", text: "Because meeting you changed everything ❤️" },
    { id: 6, sender: "her", text: "Aww... you are so sweet 🥺🥺" },
    { id: 7, sender: "me", text: "I can't wait for our future together." },
]

export default function ChatSlide() {
    const [messages, setMessages] = useState<typeof chatScript>([])
    const [isTyping, setIsTyping] = useState(false)
    const [scriptIndex, setScriptIndex] = useState(0)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scriptIndex < chatScript.length) {
            const isHerNext = chatScript[scriptIndex].sender === "her"

            // If it's her turn, show typing indicator for a bit
            if (isHerNext) {
                setIsTyping(true)
            }

            const timer = setTimeout(() => {
                setIsTyping(false)
                setMessages(prev => [...prev, chatScript[scriptIndex]])
                setScriptIndex(prev => prev + 1)
            }, isHerNext ? 2000 : 1200) // Her messages wait longer (typing)

            return () => clearTimeout(timer)
        }
    }, [scriptIndex])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages, isTyping])

    return (
        <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4 py-12">

            {/* iPhone Frame */}
            <div className="w-full max-w-sm h-full max-h-[850px] bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[8px] border-white relative overflow-hidden flex flex-col pt-12 pb-8">

                {/* Notch Area */}
                <div className="absolute top-0 inset-x-0 h-7 bg-white z-20 flex justify-center">
                    <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
                </div>

                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-10 px-6 pt-2 flex justify-between items-center text-xs font-medium z-10 font-sans text-gray-800">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <Signal size={14} />
                        <Wifi size={14} />
                        <Battery size={16} />
                    </div>
                </div>

                {/* Chat Header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100 z-10 pt-8 mt-2 shadow-sm relative">
                    <button className="text-blue-500 hover:opacity-70 transition-opacity">
                        <ChevronLeft size={28} />
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-rose-200 overflow-hidden border border-rose-100">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Nafisa" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 font-sans">Nafisa ❤️</span>
                        <span className="text-xs text-gray-400">Online</span>
                    </div>
                </div>

                {/* Chat Body */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 bg-[#f0f0f0] p-4 flex flex-col gap-3 overflow-y-auto scroll-smooth pb-10"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}
                >
                    {/* Timestamp */}
                    <div className="text-center w-full mb-4">
                        <span className="text-[10px] text-gray-500 font-medium px-2 py-1 bg-black/5 rounded-lg">Today 9:41 AM</span>
                    </div>

                    <AnimatePresence>
                        {messages.map((msg) => {
                            const isMe = msg.sender === "me"
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    layout
                                    className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}
                                >
                                    <div className={`max-w-[75%] px-4 py-2.5 font-sans text-[15px] leading-snug shadow-sm ${isMe
                                            ? "bg-blue-500 text-white rounded-2xl rounded-tr-sm"
                                            : "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex justify-start w-full"
                        >
                            <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-sm shadow-sm flex gap-1 border border-gray-100">
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            </div>
                        </motion.div>
                    )}

                    {scriptIndex >= chatScript.length && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-6 text-center text-rose-500 font-sans text-xs tracking-widest uppercase animate-pulse"
                        >
                            Scroll down to finish
                        </motion.p>
                    )}

                </div>

                {/* Chat Input Bar */}
                <div className="h-16 bg-gray-50 border-t border-gray-200 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full text-blue-500 flex items-center justify-center font-bold text-xl pb-1">+</div>
                    <div className="flex-1 h-9 rounded-full border border-gray-300 bg-white flex items-center px-4">
                        <span className="text-gray-300 text-sm font-sans">Message</span>
                    </div>
                    <div className="w-8 h-8 rounded-full text-blue-500 flex items-center justify-center">
                        {/* Mic icon placeholder */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" /></svg>
                    </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute inset-x-0 bottom-0 h-6 flex justify-center items-center bg-gray-50 z-20">
                    <div className="w-1/3 h-1 bg-black rounded-full mb-1"></div>
                </div>
            </div>
        </div>
    )
}
