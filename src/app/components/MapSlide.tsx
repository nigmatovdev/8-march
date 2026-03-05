"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Room, Close } from "@mui/icons-material";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";

const locations = [
    {
        id: 1,
        title: "Где мы впервые встретились ✨",
        desc: "Место, где все изменилось навсегда.",
        img: "/met.jpg",
        x: 30,
        y: 40
    },
    {
        id: 2,
        title: "Наше Первое Свидание ☕",
        desc: "Нервные улыбки и бесконечные разговоры.",
        img: "/date.jpg", // placeholder
        x: 60,
        y: 30
    },
    {
        id: 3,
        title: "Наше Любимое Место 🌅",
        desc: "Туда, куда мы любим ходить вместе.",
        img: "/fav.jpg",
        x: 45,
        y: 70
    }
];

export default function MapSlide({ onNext }: { onNext?: () => void }) {
    const [activeLocation, setActiveLocation] = useState<typeof locations[0] | null>(null);
    const [viewedLocations, setViewedLocations] = useState<number[]>([]);

    const handleLocationClick = (loc: typeof locations[0]) => {
        setActiveLocation(loc);
        if (!viewedLocations.includes(loc.id)) {
            setViewedLocations(prev => [...prev, loc.id]);
        }
    };

    return (
        <Box width="100%" height="100%" bgcolor="#f8f1f1" position="relative" overflow="hidden" display="flex" flexDirection="column" alignItems="center">

            {/* Background stylized map image (blurred or subtle) */}
            <Box
                position="absolute" top={0} bottom={0} left={0} right={0}
                sx={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.15,
                    filter: 'grayscale(100%)',
                    pointerEvents: 'none'
                }}
            />

            <Box position="absolute" top={0} bottom={0} left={0} right={0} sx={{ background: 'linear-gradient(to top, rgba(252, 228, 236, 0.8), transparent)', pointerEvents: 'none' }} />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', paddingTop: '4rem', zIndex: 10, position: 'relative', pointerEvents: 'none' }}
            >
                <Typography variant="h2" color="primary.main" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                    Наши Особенные Места
                </Typography>
                <Typography variant="subtitle1" color="primary.light" sx={{ letterSpacing: 1 }}>
                    Нажмите на точки на карте
                </Typography>
            </motion.div>

            {/* Pins Area */}
            <Box flex={1} width="100%" maxWidth={900} position="relative" zIndex={10}>
                {locations.map((loc, i) => (
                    <Box
                        key={loc.id}
                        position="absolute"
                        sx={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -100%)' }}
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.2), type: "spring", bounce: 0.5 }}
                            onClick={() => handleLocationClick(loc)}
                            whileHover={{ scale: 1.1, zIndex: 20 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none'
                            }}
                        >
                            <Box
                                bgcolor="primary.main"
                                color="white"
                                p={1.5}
                                borderRadius="50%"
                                position="relative"
                                boxShadow="0 5px 15px rgba(216, 27, 96, 0.4)"
                            >
                                <Room sx={{ fontSize: 32 }} />
                                {/* Pulsing ring */}
                                <Box
                                    position="absolute" top={0} bottom={0} left={0} right={0} borderRadius="50%" bgcolor="primary.light"
                                    sx={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.5, zIndex: -10 }}
                                />
                            </Box>

                            {/* Hover Tooltip equivalent */}
                            <Box
                                mt={1} px={2} py={0.5} borderRadius={4} bgcolor="rgba(255,255,255,0.9)"
                                sx={{ backdropFilter: 'blur(4px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                            >
                                <Typography variant="caption" color="primary.dark" fontWeight="bold" whiteSpace="nowrap">
                                    {loc.title}
                                </Typography>
                            </Box>
                        </motion.button>
                    </Box>
                ))}
            </Box>

            {/* Location Modal */}
            <AnimatePresence>
                {activeLocation && (
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        position="absolute"
                        zIndex={50}
                        top={0} bottom={0} left={0} right={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={2}
                        onClick={() => setActiveLocation(null)}
                        sx={{ bgcolor: 'rgba(136, 14, 79, 0.2)', backdropFilter: 'blur(8px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Paper elevation={24} sx={{ borderRadius: 6, overflow: 'hidden', width: '100%', maxWidth: 400, position: 'relative' }}>

                                <IconButton
                                    onClick={() => setActiveLocation(null)}
                                    sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(0,0,0,0.3)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }, zIndex: 10 }}
                                >
                                    <Close />
                                </IconButton>

                                <Box height={260} position="relative" overflow="hidden">
                                    <img
                                        src={activeLocation.img}
                                        alt={activeLocation.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Box position="absolute" bottom={0} left={0} right={0} height="50%" sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                                </Box>

                                <Box p={4} bgcolor="white" position="relative">
                                    <Box position="absolute" top={-28} right={24} bgcolor="primary.main" p={1.5} borderRadius="50%" color="white" boxShadow="0 8px 16px rgba(216, 27, 96, 0.3)">
                                        <Room sx={{ fontSize: 32 }} />
                                    </Box>

                                    <Typography variant="h3" color="text.primary" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
                                        {activeLocation.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                                        {activeLocation.desc}
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => setActiveLocation(null)}
                                        sx={{ mt: 2, borderRadius: 4, py: 1.5, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                                    >
                                        Закрыть
                                    </Button>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {viewedLocations.length === locations.length && !activeLocation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ position: 'absolute', bottom: '2rem', zIndex: 10 }}
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
