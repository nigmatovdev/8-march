"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Favorite } from "@mui/icons-material";
import { Box, Typography, LinearProgress, Paper, Button } from "@mui/material";

type FallingHeart = {
    id: number;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    speed: number;
};

export default function CatchHeartSlide({ onComplete, onNext }: { onComplete?: () => void, onNext?: () => void }) {
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState<FallingHeart[]>([]);
    const [isWon, setIsWon] = useState(false);
    const [basketX, setBasketX] = useState(50); // percentage 0-100

    useEffect(() => {
        if (isWon) onComplete?.();
    }, [isWon, onComplete]);

    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const heartIdCounter = useRef(0);

    // Spawner
    useEffect(() => {
        if (isWon) return;
        const spawnTimer = setInterval(() => {
            setHearts(prev => {
                if (prev.length > 5) return prev; // Max 5 at a time
                return [
                    ...prev,
                    {
                        id: ++heartIdCounter.current,
                        x: Math.random() * 80 + 10, // 10% to 90%
                        y: -10,
                        speed: Math.random() * 0.15 + 0.1 // slower speed factor
                    }
                ];
            });
        }, 1800); // 1.8s spawn timer
        return () => clearInterval(spawnTimer);
    }, [isWon]);

    // Game Loop
    useEffect(() => {
        if (isWon) return;

        const updateGame = () => {
            setHearts(prev => {
                let newHearts = [...prev];

                for (let i = newHearts.length - 1; i >= 0; i--) {
                    const h = newHearts[i];
                    h.y += h.speed;

                    // Check collision
                    // Basket is at y ~ 85%, width ~ 20%
                    const inCatchZone = h.y > 80 && h.y < 95;
                    const inHorizontalBounds = Math.abs(h.x - basketX) < 15;

                    if (inCatchZone && inHorizontalBounds) {
                        setScore(s => {
                            const newScore = s + 1;
                            if (newScore >= 10) setIsWon(true);
                            return newScore;
                        });
                        newHearts.splice(i, 1); // caught
                        continue;
                    }

                    if (h.y > 110) {
                        newHearts.splice(i, 1); // missed
                    }
                }
                return newHearts;
            });
            requestRef.current = requestAnimationFrame(updateGame);
        };

        requestRef.current = requestAnimationFrame(updateGame);
        return () => cancelAnimationFrame(requestRef.current);
    }, [basketX, isWon]);

    // Mouse / Touch movement tracking
    const handleMove = (clientX: number) => {
        if (!containerRef.current || isWon) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        setBasketX(Math.max(5, Math.min(95, x)));
    };

    return (
        <Box
            ref={containerRef}
            width="100%"
            height="100%"
            position="relative"
            overflow="hidden"
            onMouseMove={(e) => handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            sx={{ userSelect: 'none' }}
        >
            {/* HUD */}
            <Box position="absolute" top={40} left={0} right={0} zIndex={20} display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h2" color="primary.main" sx={{ mb: 2, textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}>
                    Поймай Мое Сердце
                </Typography>

                {/* Progress Bar */}
                <Box width={250} mt={1}>
                    <LinearProgress
                        variant="determinate"
                        value={(score / 10) * 100}
                        sx={{ height: 12, borderRadius: 6, bgcolor: 'rgba(255,255,255,0.5)', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 6 } }}
                    />
                </Box>
                <Typography variant="button" color="primary.main" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {score} / 10
                </Typography>
            </Box>

            {/* Falling Hearts */}
            {!isWon && hearts.map(h => (
                <Box
                    key={h.id}
                    position="absolute"
                    sx={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)', animation: 'pulse 1s infinite' }}
                >
                    <Favorite sx={{ fontSize: 72, color: 'primary.light', filter: 'drop-shadow(0px 4px 6px rgba(244, 143, 177, 0.8))' }} />
                </Box>
            ))}

            {/* Basket */}
            {!isWon && (
                <Box
                    position="absolute"
                    bottom="10%"
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                    sx={{
                        left: `${basketX}%`,
                        transform: 'translateX(-50%)',
                        fontSize: { xs: '3rem', md: '4rem' },
                        transition: 'transform 0.05s ease-out',
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
                    }}
                >
                    🧺
                </Box>
            )}

            {/* Winning Screen */}
            <AnimatePresence>
                {isWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            position: 'absolute', inset: 0, zIndex: 30, display: 'flex',
                            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: 'rgba(253, 242, 248, 0.9)', backdropFilter: 'blur(8px)'
                        }}
                    >
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <Paper elevation={12} sx={{ p: 4, borderRadius: '50%', mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Favorite sx={{ fontSize: 80, color: 'primary.main' }} />
                            </Paper>
                        </motion.div>

                        <Typography variant="h2" color="primary.main" textAlign="center" gutterBottom>
                            Ты поймала мое сердце ❤️
                        </Typography>

                        <Button variant="contained" color="primary" onClick={onNext} sx={{ mt: 4, borderRadius: 8, px: 6, py: 1.5, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}>
                            Дальше
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}
