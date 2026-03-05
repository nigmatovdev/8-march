"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Box, Typography, Button } from "@mui/material";

const memories = [
    { id: 1, caption: "С днем рождения, любимая! ", img: "/birthday.jpg" },
    { id: 2, caption: "Наше первое свидание", img: "/firstdate.jpg" },
    { id: 3, caption: "В гостях у Ситоры", img: "/sitorasbd.jpg" },
    { id: 4, caption: "Наши перекусы в машине", img: "/careat.jpg" },
    { id: 5, caption: "Длинные разговоры", img: "/daily.jpg" },
    { id: 6, caption: "Как мы заботимя о друзьях", img: "/others.jpg" },
    { id: 7, caption: "Вместе на высоте", img: "/carusel.jpg" },
    { id: 8, caption: "Поездка в горы", img: "/trip.jpg" },
    { id: 9, caption: "Дурачимся вместе", img: "/dummy.jpg" },

];

function Card({
    memory, index, activeIndex, totalCards, setNext
}: {
    memory: typeof memories[0], index: number, activeIndex: number, totalCards: number, setNext: () => void
}) {
    const x = useMotionValue(0);
    const rotation = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const isActive = index === activeIndex;

    // Calculate fan spread based on distance from active card
    const offset = index - activeIndex;

    // If the card is already swiped away (offset < 0), we don't render it or let framer exit it.
    if (offset < 0) return null;

    const tilt = offset * 5; // Fan out 5 degrees per card
    const scale = 1 - (offset * 0.05); // slightly smaller further back
    const yOffset = offset * 8;

    const handleDragEnd = (event: any, info: any) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
            setNext();
        }
    };

    return (
        <motion.div
            style={{
                position: "absolute",
                width: '75vw',
                maxWidth: 280,
                height: '55vh',
                maxHeight: 400,
                x,
                y: yOffset,
                rotate: isActive ? rotation : tilt,
                scale,
                opacity: isActive ? opacity : 1 - (offset * 0.2), // fade background cards slightly
                zIndex: totalCards - index, // Front card is highest
                touchAction: "none",
                transformOrigin: "bottom center"
            }}
            drag={isActive ? true : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileTap={isActive ? { cursor: "grabbing" } : {}}
            onDragEnd={handleDragEnd}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: yOffset, opacity: 1 }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Box
                sx={{
                    width: '100%', height: '100%',
                    bgcolor: 'white', borderRadius: 4,
                    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.15)' : '0 10px 20px rgba(0,0,0,0.05)',
                    overflow: 'hidden', cursor: isActive ? 'grab' : 'default',
                    border: '1px solid #fce4ec', display: 'flex', flexDirection: 'column'
                }}
            >
                <Box flex={1} position="relative" overflow="hidden">
                    <img src={memory.img} alt={memory.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                    <Box position="absolute" bottom={0} left={0} right={0} height="50%" sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                </Box>
                <Box p={{ xs: 1.5, md: 3 }} textAlign="center" display="flex" alignItems="center" justifyContent="center" height="100%" maxHeight={{ xs: 60, md: 80 }}>
                    <Typography variant="h6" color="primary.dark" sx={{ fontStyle: 'italic', fontSize: { xs: '0.85rem', sm: '1.25rem' }, lineHeight: 1.2 }}>
                        {memory.caption}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
}

export default function GuessMemorySlide({ onComplete, onNext }: { onComplete?: () => void, onNext?: () => void }) { // Keeping component name same for easy page.tsx usage
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (activeIndex === memories.length) {
            onComplete?.();
        }
    }, [activeIndex, onComplete]);

    const setNext = () => {
        if (activeIndex < memories.length) {
            setActiveIndex(prev => prev + 1);
        }
    };

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" bgcolor="#fdf2f8" p={3} overflow="hidden">

            <Box textAlign="center" mt={{ xs: 4, sm: 8, md: 10 }} zIndex={10}>
                <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' }, mb: { xs: 1, md: 2 } }}>
                    Наши Воспоминания
                </Typography>
                <Typography variant="subtitle1" color="primary.light" sx={{ letterSpacing: { xs: 0, md: 1 }, fontSize: { xs: '0.85rem', md: '1rem' }, px: 2 }}>
                    Смахивайте фото как карты, чтобы листать букет 💐
                </Typography>
            </Box>

            <Box flex={1} display="flex" alignItems="center" justifyContent="center" position="relative" width="100%" mt={4}>
                <AnimatePresence>
                    {memories.map((m, i) => (
                        <Card
                            key={m.id}
                            memory={m}
                            index={i}
                            activeIndex={activeIndex}
                            totalCards={memories.length}
                            setNext={setNext}
                        />
                    ))}
                </AnimatePresence>

                {activeIndex === memories.length && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4" color="primary.main" sx={{ animation: 'pulse 2s infinite' }}>
                            ❤️
                        </Typography>
                        <Button variant="contained" color="primary" onClick={onNext} sx={{ mt: 2, borderRadius: 8, px: 6, py: 1.5, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}>
                            Дальше
                        </Button>
                    </motion.div>
                )}
            </Box>

        </Box>
    );
}
