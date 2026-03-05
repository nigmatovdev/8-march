"use client"

import { useEffect, useState } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { Heart, CalendarHeart, Gem } from "lucide-react"

function AnimatedCounter({ to, duration = 2.5 }: { to: number; duration?: number }) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const [inView, setInView] = useState(false)

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration, ease: "easeOut" })
            return controls.stop
        }
    }, [inView, count, to, duration])

    return (
        <motion.span
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true }}
        >
            {rounded}
        </motion.span>
    )
}

const counters = [
    {
        id: 1,
        title: "Days since we met ❤️",
        value: 642, // Placeholder
        icon: <Heart size={40} className="text-rose-500 mb-4 drop-shadow-sm" />
    },
    {
        id: 2,
        title: "Days since we became official 💑",
        value: 501, // Placeholder
        icon: <CalendarHeart size={40} className="text-pink-500 mb-4 drop-shadow-sm" />
    },
    {
        id: 3,
        title: "Days until our wedding 💍",
        value: 124, // Placeholder
        icon: <Gem size={40} className="text-fuchsia-500 mb-4 drop-shadow-sm" />
    }
]

export default function CounterSlide() {
    return (
        <div className="w-full h-full bg-[#fff0f5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 z-10"
            >
                <h2 className="font-serif text-4xl md:text-5xl text-rose-600 mb-4 tracking-wide font-medium">
                    Our Journey in Numbers
                </h2>
                <p className="text-rose-400 font-sans text-lg">Every single day is a gift.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full max-w-5xl justify-center z-10">
                {counters.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.3 }}
                        className="flex flex-col items-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 flex-1"
                    >
                        {item.icon}
                        <div className="font-sans text-5xl md:text-6xl font-bold text-gray-800 mb-4 tabular-nums tracking-tighter">
                            <AnimatedCounter to={item.value} />
                        </div>
                        <h3 className="text-gray-600 text-center font-serif text-xl leading-snug">
                            {item.title}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-16 text-rose-500 font-sans tracking-widest uppercase animate-pulse z-10 text-sm"
            >
                Scroll down for next level
            </motion.p>
        </div>
    )
}
