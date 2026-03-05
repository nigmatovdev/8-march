"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Favorite, Search } from "@mui/icons-material";
import { Box, Typography, Button, Paper } from "@mui/material";

const notes = [
    { id: 1, text: "Я люблю твою прекрасную улыбку ✨", x: 15, y: 25 },
    { id: 2, text: "Я люблю твою бесконечную доброту 🌸", x: 80, y: 15 },
    { id: 3, text: "Я люблю то, как ты смеешься 🎵", x: 20, y: 75 },
    { id: 4, text: "Я люблю наше совместное будущее 🏡", x: 70, y: 80 },
    { id: 5, text: "Я люблю то, что я чувствую рядом с тобой ❤️", x: 50, y: 50 }
];

export default function HiddenNotesSlide({ onComplete, onNext }: { onComplete?: () => void, onNext?: () => void }) {
    const [foundNotes, setFoundNotes] = useState<number[]>([]);
    const [activePopup, setActivePopup] = useState<{ id: number; text: string } | null>(null);

    useEffect(() => {
        if (foundNotes.length === notes.length) onComplete?.();
    }, [foundNotes.length, onComplete]);

    const handleFind = (note: { id: number; text: string }) => {
        setActivePopup({ id: note.id, text: note.text });
        if (!foundNotes.includes(note.id)) {
            setFoundNotes(prev => [...prev, note.id]);
        }
    };

    const closePopup = () => setActivePopup(null);

    return (
        <Box width="100%" height="100%" position="relative" overflow="hidden" sx={{ background: "linear-gradient(to top right, #fce4ec, #fff0f5, #fdf2f8)" }}>
            {/* Background Decor */}
            <Box
                position="absolute" top={0} bottom={0} left={0} right={0} sx={{ opacity: 0.2, pointerEvents: 'none' }}
                style={{ backgroundImage: 'radial-gradient(#d81b60 2px, transparent 2px)', backgroundSize: '40px 40px' }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', paddingTop: '4rem', zIndex: 10, position: 'relative', pointerEvents: 'none' }}
            >
                <Typography variant="h2" color="primary.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Search sx={{ color: 'primary.light', fontSize: 40 }} />
                    Поиск Сокровищ
                </Typography>
                <Typography variant="h6" color="primary.light" sx={{ fontWeight: 400 }}>
                    Найди {notes.length} скрытых любовных посланий
                </Typography>
                <Box display="inline-block" mt={2} px={3} py={0.5} borderRadius={4} sx={{ bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(5px)' }}>
                    <Typography variant="button" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 2 }}>
                        {foundNotes.length} / {notes.length} Найдено
                    </Typography>
                </Box>
            </motion.div>

            {/* Hidden Notes */}
            {notes.map(note => {
                const isFound = foundNotes.includes(note.id);
                return (
                    <Box
                        key={note.id}
                        position="absolute"
                        zIndex={20}
                        sx={{ left: `${note.x}%`, top: `${note.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: note.id * 0.2, type: "spring" }}
                            onClick={() => handleFind(note)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}
                            aria-label="Скрытое послание любви"
                        >
                            <motion.div
                                animate={{ scale: isFound ? 1 : [1, 1.2, 1] }}
                                transition={{ repeat: isFound ? 0 : Infinity, duration: 1.5 + (note.id * 0.1) }}
                            >
                                <Favorite
                                    sx={{
                                        fontSize: 56, // Increased size
                                        transition: 'all 0.5s',
                                        filter: 'drop-shadow(0px 4px 10px rgba(216, 27, 96, 0.6))', // Stronger shadow
                                        color: isFound ? 'primary.light' : 'primary.main',
                                        opacity: isFound ? 0.6 : 1
                                    }}
                                />
                            </motion.div>
                        </motion.button>
                    </Box>
                );
            })}

            {/* Popup Modal */}
            <AnimatePresence>
                {activePopup && (
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
                        onClick={closePopup}
                        sx={{ bgcolor: 'rgba(136, 14, 79, 0.2)', backdropFilter: 'blur(4px)', p: 2 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <Paper
                                elevation={24}
                                sx={{
                                    borderRadius: 6, p: { xs: 4, md: 6 }, width: '100%', maxWidth: 400,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                                    position: 'relative', overflow: 'visible', bgcolor: 'rgba(255, 255, 255, 0.95)'
                                }}
                            >
                                <Box
                                    position="absolute"
                                    top={-30}
                                    bgcolor="primary.main"
                                    borderRadius="50%"
                                    p={2}
                                    boxShadow="0 8px 16px rgba(216, 27, 96, 0.4)"
                                >
                                    <Favorite sx={{ color: 'white', fontSize: 30, animation: 'pulse 1.5s infinite' }} />
                                </Box>

                                <Typography variant="h4" color="text.primary" sx={{ mt: 3, mb: 4, fontStyle: 'italic', lineHeight: 1.5 }}>
                                    "{activePopup.text}"
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={closePopup}
                                    sx={{ mt: 2, borderRadius: 8, px: 6, py: 1.5, fontSize: '1.2rem', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}
                                >
                                    Закрыть
                                </Button>
                            </Paper>
                        </motion.div>
                    </Box>
                )}
            </AnimatePresence>

            {/* Completion Text */}
            <AnimatePresence>
                {foundNotes.length === notes.length && !activePopup && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}
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
