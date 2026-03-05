"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, Paper, IconButton, Button } from "@mui/material";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

const timelineEvents = [
    {
        id: 1,
        date: new Date('2022-10-05T18:00:00'),
        title: "День нашей первой встречи",
        desc: "Прошло ровно столько времени с того момента, как моя жизнь изменилась.",
        img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        isFuture: false
    },
    {
        id: 2,
        date: new Date('2025-08-28T20:00:00'),
        title: "Наше первое свидание",
        desc: "С тех пор мое сердце бьется только для тебя.",
        img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
        isFuture: false
    },
    {
        id: 3, // Assuming a future wedding date
        date: new Date('2026-08-08T12:00:00'),
        title: "День нашей свадьбы",
        desc: "Время, оставшееся до того дня, когда я назову тебя своей женой.",
        img: "https://images.unsplash.com/photo-1621217631557-013143c683b5?auto=format&fit=crop&q=80&w=800",
        isFuture: true
    }
];

// Helper to calc elapsed/remaining time
function getTimeDiff(targetDate: Date, isFuture: boolean) {
    const now = new Date();

    // If it's a future event, time diff is target - now. If past, now - target.
    const diff = isFuture ? targetDate.getTime() - now.getTime() : now.getTime() - targetDate.getTime();

    // Bottom out at 0 if the future date accidentally passed
    const safeDiff = Math.max(0, diff);

    const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((safeDiff / 1000 / 60) % 60);
    const seconds = Math.floor((safeDiff / 1000) % 60);

    return { days, hours, minutes, seconds };
}

export default function CounterSlide({ onNext }: { onNext?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [elapsed, setElapsed] = useState(getTimeDiff(timelineEvents[0].date, timelineEvents[0].isFuture));

    // Update Counter Every Second
    useEffect(() => {
        const targetEvent = timelineEvents[currentIndex];

        // Initial set
        setElapsed(getTimeDiff(targetEvent.date, targetEvent.isFuture));

        const timer = setInterval(() => {
            setElapsed(getTimeDiff(targetEvent.date, targetEvent.isFuture));
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < timelineEvents.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const currentEvent = timelineEvents[currentIndex];
    const isImageRight = currentIndex % 2 !== 0; // Alternate layout left/right

    return (
        <Box position="relative" width="100%" height="100%" bgcolor="#fdf2f8" display="flex" flexDirection="column" alignItems="center" justifyContent="center" overflow="hidden">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 10, width: '100%' }}
            >
                <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                    Наша История в Цифрах
                </Typography>
                <Typography variant="subtitle1" color="primary.light">
                    Каждая секунда с тобой — это бесценный дар.
                </Typography>
            </motion.div>

            <Box position="relative" width="100%" maxWidth="lg" display="flex" alignItems="center" px={{ xs: 2, md: 4 }} zIndex={10}>

                {/* Previous Button */}
                <IconButton
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    color="primary"
                    sx={{ mr: { xs: 1, md: 4 }, opacity: currentIndex === 0 ? 0.3 : 1 }}
                >
                    <ArrowBackIosNew fontSize="large" />
                </IconButton>

                <Box flex={1}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isImageRight ? 50 : -50 }}
                            transition={{ duration: 0.6, type: "spring" }}
                        >
                            <Paper
                                elevation={12}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    borderRadius: 8, overflow: 'hidden', bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                                    p: { xs: 4, md: 8 }
                                }}
                            >
                                <Typography variant="overline" color="primary.light" sx={{ letterSpacing: 2, fontWeight: 'bold' }}>
                                    {currentEvent.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </Typography>
                                <Typography variant="h3" color="primary.dark" gutterBottom sx={{ mt: 1, lineHeight: 1.2, fontSize: { xs: '2rem', md: '3rem' } }}>
                                    {currentEvent.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, mb: 4, maxWidth: 600 }}>
                                    {currentEvent.desc}
                                </Typography>

                                {/* Live Counter */}
                                <Box display="flex" gap={2} mt={2} justifyContent="center" width="100%">
                                    {[
                                        { value: elapsed.days, label: "Дней" },
                                        { value: elapsed.hours, label: "Часов" },
                                        { value: elapsed.minutes, label: "Минут" },
                                        { value: elapsed.seconds, label: "Секунд" }
                                    ].map((unit, i) => (
                                        <Box key={i} display="flex" flexDirection="column" alignItems="center" flex={1}>
                                            <Typography variant="h4" color="primary.main" fontWeight="bold" sx={{ fontFamily: 'var(--font-montserrat)', fontSize: { xs: '1.8rem', md: '3rem' } }}>
                                                {String(unit.value).padStart(2, '0')}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: { xs: 0, md: 1 }, fontSize: { xs: '0.7rem', md: '0.9rem' }, mt: 1 }}>
                                                {unit.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Next Button */}
                <IconButton
                    onClick={handleNext}
                    disabled={currentIndex === timelineEvents.length - 1}
                    color="primary"
                    sx={{ ml: { xs: 1, md: 4 }, opacity: currentIndex === timelineEvents.length - 1 ? 0.3 : 1 }}
                >
                    <ArrowForwardIos fontSize="large" />
                </IconButton>

            </Box>

            {/* Next Minigame Button */}
            <AnimatePresence>
                {currentIndex === timelineEvents.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ position: 'absolute', bottom: '2rem', zIndex: 50 }}
                    >
                        <Button variant="contained" color="primary" onClick={onNext} sx={{ borderRadius: 8, px: 6, py: 1.5, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}>
                            Дальше
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}
