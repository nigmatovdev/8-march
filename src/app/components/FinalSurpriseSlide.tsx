"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Favorite, CardGiftcard } from "@mui/icons-material";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function FinalSurpriseSlide() {
    const [opened, setOpened] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [yesClicked, setYesClicked] = useState(false);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const handleNoHover = (e?: any) => {
        if (e && e.preventDefault) e.preventDefault();
        const newX = (Math.random() - 0.5) * 250;
        const newY = (Math.random() - 0.5) * 250;
        setNoButtonPos({ x: newX, y: newY });
    };

    return (
        <Box width="100%" height="100%" bgcolor="#fdf2f8" display="flex" flexDirection="column" alignItems="center" justifyContent="center" position="relative" overflow="hidden" p={2}>

            {opened && !yesClicked && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={true}
                    numberOfPieces={200}
                    gravity={0.05}
                    colors={['#d81b60', '#f48fb1', '#f8bbd0', '#c2185b', '#fff1f2']}
                />
            )}

            {/* Floating background hearts */}
            {opened && !yesClicked && Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: windowSize.height, x: Math.random() * windowSize.width, opacity: 0, scale: Math.random() * 1.5 + 0.5 }}
                    animate={{ y: -100, opacity: [0, 1, 0] }}
                    transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                    style={{ position: 'absolute', zIndex: 0, color: 'rgba(244, 143, 177, 0.4)' }}
                >
                    <Favorite sx={{ fontSize: 32 }} />
                </motion.div>
            ))}

            <AnimatePresence mode="wait">
                {!opened ? (
                    <Box
                        component={motion.div}
                        key="gift-box"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        zIndex={10}
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            onClick={() => setOpened(true)}
                            style={{
                                background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
                                border: '1px solid #f8bbd0', padding: '2rem', borderRadius: '50%',
                                boxShadow: '0 20px 50px rgba(216, 27, 96, 0.3)', marginBottom: '2rem', cursor: 'pointer'
                            }}
                        >
                            <CardGiftcard sx={{ fontSize: 100, color: 'primary.main' }} />
                        </motion.button>
                        <Typography variant="h2" color="primary.main">
                            Открой свой сюрприз 🎁
                        </Typography>
                    </Box>
                ) : !yesClicked ? (
                    <Box
                        component={motion.div}
                        key="surprise-msg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        display="flex" flexDirection="column" alignItems="center" textAlign="center" zIndex={20} maxWidth={700}
                    >
                        <Paper elevation={24} sx={{ p: { xs: 3, md: 8 }, borderRadius: 8, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid white', maxHeight: '90vh', overflowY: 'auto', width: '100%', scrollbarWidth: 'none' }}>
                            <Typography variant="h1" color="primary.main" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '5rem' }, lineHeight: 1.1 }}>
                                С 8 Марта <br /><span style={{ fontStyle: 'italic', fontWeight: 600 }}>Нафиса 🌸</span>
                            </Typography>

                            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 1, fontFamily: 'var(--font-montserrat)', fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.5 }}>
                                Ты самая удивительная девушка в моей жизни.<br />
                                Спасибо тебе за каждый момент, каждую улыбку и каждое воспоминание.<br />
                                Я не могу дождаться нашего совместного будущего.
                            </Typography>

                            <Typography variant="h4" color="primary.light" sx={{ mt: 2, mb: 3, fontWeight: 700, fontStyle: 'italic', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                                Я люблю тебя ❤️
                            </Typography>

                            <Box width="100%" height={1} sx={{ background: 'linear-gradient(90deg, transparent, #f48fb1, transparent)', my: 2 }} />

                            <Typography variant="h4" color="text.primary" sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                                Ты останешься со мной навсегда?
                            </Typography>

                            <Box display="flex" gap={3} alignItems="center" justifyContent="center" position="relative" height={80} width="100%">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ zIndex: 30 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setYesClicked(true)}
                                        sx={{ px: 6, py: 2, borderRadius: 8, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}
                                    >
                                        ДА ❤️
                                    </Button>
                                </motion.div>

                                <motion.div
                                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    onMouseEnter={handleNoHover}
                                    onClick={handleNoHover}
                                    onTouchStart={handleNoHover}
                                    style={{ position: 'absolute', right: '10%', zIndex: 30 }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ bgcolor: '#e0e0e0', color: '#757575', px: 6, py: 2, borderRadius: 8, fontSize: '1.2rem', '&:hover': { bgcolor: '#e0e0e0' } }}
                                    >
                                        НЕТ 💔
                                    </Button>
                                </motion.div>
                            </Box>
                        </Paper>
                    </Box>
                ) : (
                    <Box
                        component={motion.div}
                        key="final-yes"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        display="flex" flexDirection="column" alignItems="center" textAlign="center" zIndex={30}
                    >
                        <Paper elevation={16} sx={{ p: 6, borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Favorite sx={{ fontSize: 120, color: 'primary.main', animation: 'pulse 1.5s infinite' }} />
                        </Paper>

                        <Typography variant="h1" color="primary.main" sx={{ textShadow: '0 4px 10px rgba(216, 27, 96, 0.2)', fontSize: { xs: '4rem', md: '6rem' } }}>
                            Я ТАК И ЗНАЛ! 🥰
                        </Typography>

                        <Typography variant="overline" color="primary.light" sx={{ fontSize: '1.5rem', mt: 2, letterSpacing: 4, fontWeight: 700 }}>
                            Навсегда и Навечно
                        </Typography>
                    </Box>
                )}
            </AnimatePresence>
        </Box>
    );
}
