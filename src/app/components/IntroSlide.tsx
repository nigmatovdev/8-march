"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Favorite } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function IntroSlide({ onUnlock }: { onUnlock: () => void }) {
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const holdTimer = useRef<NodeJS.Timeout | null>(null);
    const controls = useAnimation();

    const handlePointerDown = () => {
        setIsHolding(true);
        controls.start({
            scale: 1.1,
            transition: { duration: 3, ease: "linear" }
        });
    };

    const handlePointerUp = () => {
        setIsHolding(false);
        controls.stop();
        controls.start({ scale: 1, transition: { type: "spring", stiffness: 300 } });

        setProgress((p) => {
            if (p < 100) return 0;
            return p;
        });

        if (holdTimer.current) {
            clearInterval(holdTimer.current);
            holdTimer.current = null;
        }
    };

    useEffect(() => {
        if (isHolding) {
            const interval = 30; // update every 30ms
            const totalTime = 3000; // 3 seconds

            holdTimer.current = setInterval(() => {
                setProgress((prev) => {
                    const next = prev + (interval / totalTime) * 100;
                    return next >= 100 ? 100 : next;
                });
            }, interval);
        }

        return () => {
            if (holdTimer.current) clearInterval(holdTimer.current);
        };
    }, [isHolding]);

    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        if (progress >= 100 && countdown === null) {
            handlePointerUp();
            setCountdown(3);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const t = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(t);
        } else if (countdown === 0) {
            const t = setTimeout(() => onUnlock(), 500); // slight delay after '0' (or text)
            return () => clearTimeout(t);
        }
    }, [countdown, onUnlock]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            sx={{ userSelect: 'none' }}
        >
            <Box textAlign="center" mb={6} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 } as any}>
                <Typography variant="h1" color="primary.main" gutterBottom sx={{ letterSpacing: 2, fontSize: { xs: '3rem', md: '4rem' } }}>
                    Дорогая
                </Typography>
                <Typography variant="subtitle1" color="primary.light" sx={{ textTransform: 'uppercase', letterSpacing: 4, fontWeight: 300 }}>
                    С 8 Марта тебя 🌸
                </Typography>
            </Box>

            <Box position="relative" display="flex" flexDirection="column" alignItems="center">
                <motion.div
                    animate={controls}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onTouchStart={handlePointerDown}
                    onTouchEnd={handlePointerUp}
                    style={{ position: 'relative', cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    aria-label="Удерживайте, чтобы открыть нашу историю"
                >
                    {/* Base Background Heart (MUI Icon) */}
                    <Favorite sx={{ fontSize: 140, color: 'rgba(244, 143, 177, 0.2)', stroke: '#f48fb1', strokeWidth: 0.5 }} />

                    {/* Filling Heart */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        sx={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    >
                        <Favorite sx={{ fontSize: 140, color: 'primary.main', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }} />
                    </Box>

                    {/* Growing Glowing pulse behind heart when not holding */}
                    {!isHolding && progress === 0 && countdown === null && (
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            style={{ position: 'absolute', inset: 0, backgroundColor: '#f48fb1', borderRadius: '50%', zIndex: -10, filter: 'blur(24px)' }}
                        />
                    )}

                    {/* Countdown Overlay */}
                    {countdown !== null && (
                        <Box
                            position="absolute"
                            top={0}
                            bottom={0}
                            left={0}
                            right={0}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            zIndex={20}
                        >
                            <motion.div
                                key={countdown}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h2" color="white" sx={{ fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    {countdown > 0 ? countdown : "Поехали!"}
                                </Typography>
                            </motion.div>
                        </Box>
                    )}
                </motion.div>

                <motion.div animate={{ opacity: isHolding ? 1 : 0.6 }}>
                    <Typography
                        variant="body2"
                        color="primary.main"
                        sx={{ mt: 5, textTransform: 'uppercase', letterSpacing: 3, fontWeight: 500, textAlign: 'center', height: 24 }}
                    >
                        {countdown !== null ? "" : isHolding ? "Наполняется любовью ❤️" : "Удерживайте, чтобы начать нашу историю"}
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
}
