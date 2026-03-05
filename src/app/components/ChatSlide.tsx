"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryStd, Wifi, SignalCellularAlt, ArrowBackIosNew, Mic } from "@mui/icons-material";
import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";

const chatScript = [
    { id: 1, sender: "me", text: "Спишь?" },
    { id: 2, sender: "her", text: "Нет, а вы?" },
    { id: 3, sender: "her", text: "Тинчлими" },
    { id: 4, sender: "me", text: "Просто йозгим кеп колди)" },
    { id: 5, sender: "her", text: "У нас ничего не получится" },
    { id: 6, sender: "her", text: "Мы просто друзья" },
    { id: 7, sender: "me", text: "Яхши кораман сани" },
];

export default function ChatSlide({ onComplete, onNext }: { onComplete?: () => void, onNext?: () => void }) {
    const [messages, setMessages] = useState<typeof chatScript>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [scriptIndex, setScriptIndex] = useState(0);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scriptIndex >= chatScript.length) onComplete?.();
    }, [scriptIndex, onComplete]);

    useEffect(() => {
        if (scriptIndex < chatScript.length) {
            const isHerNext = chatScript[scriptIndex].sender === "her";

            if (isHerNext) {
                setIsTyping(true);
            }

            const timer = setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, chatScript[scriptIndex]]);
                setScriptIndex(prev => prev + 1);
            }, isHerNext ? 2000 : 1200);

            return () => clearTimeout(timer);
        }
    }, [scriptIndex]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <Box width="100%" height="100%" bgcolor="#fdf2f8" display="flex" alignItems="center" justifyContent="center" p={2} py={6}>

            {/* iPhone Frame */}
            <Box
                width="100%" maxWidth={{ xs: '100vw', sm: 380 }} height="100%" maxHeight={{ xs: '100vh', sm: 820 }}
                bgcolor="white" borderRadius={{ xs: 0, sm: 12 }} boxShadow="0 20px 50px rgba(216, 27, 96, 0.15)"
                border={{ xs: 'none', sm: '8px solid #fff' }} position="relative" overflow="hidden" display="flex" flexDirection="column"
            >

                {/* Notch Area */}
                <Box position="absolute" top={0} left={0} right={0} height={30} bgcolor="white" zIndex={20} display="flex" justifyContent="center">
                    <Box width={120} height={24} bgcolor="black" sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }} />
                </Box>

                {/* Status Bar */}
                <Box position="absolute" top={0} left={0} right={0} height={40} px={3} pt={1} display="flex" justifyContent="space-between" alignItems="center" zIndex={10}>
                    <Typography variant="caption" fontWeight="bold" color="text.primary">
                        9:41
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <SignalCellularAlt sx={{ fontSize: 16, color: 'text.primary' }} />
                        <Wifi sx={{ fontSize: 16, color: 'text.primary' }} />
                        <BatteryStd sx={{ fontSize: 18, color: 'text.primary' }} />
                    </Box>
                </Box>

                {/* Chat Header */}
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }} px={2} py={1.5} bgcolor="#f8f9fa" borderBottom="1px solid #eee" zIndex={10} pt={6}>
                    <IconButton color="primary" size="small" sx={{ p: { xs: 0.5, sm: 1 } }}>
                        <ArrowBackIosNew fontSize="small" />
                    </IconButton>
                    <Box position="relative">
                        <Avatar src="/ava.jpg" alt="Нафиса" sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }} />
                        {/* Online Dot */}
                        <Box position="absolute" bottom={0} right={0} width={{ xs: 10, sm: 12 }} height={{ xs: 10, sm: 12 }} bgcolor="#4caf50" borderRadius="50%" border="2px solid white" />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="subtitle2" fontWeight="bold" color="text.primary" lineHeight={1.2} sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                            nafisa musulmonova
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            В сети
                        </Typography>
                    </Box>
                </Box>

                {/* Chat Body */}
                <Box
                    ref={chatContainerRef}
                    flex={1} p={2} display="flex" flexDirection="column" gap={1.5} overflow="auto"
                    bgcolor="#f0f0f0"
                    sx={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', scrollBehavior: 'smooth' }}
                >
                    {/* Timestamp */}
                    <Box textAlign="center" width="100%" mb={2}>
                        <Typography variant="caption" sx={{ bgcolor: 'rgba(0,0,0,0.06)', px: 1.5, py: 0.5, borderRadius: 2, color: 'text.secondary', fontWeight: 500 }}>
                            Сегодня 9:41
                        </Typography>
                    </Box>

                    <AnimatePresence>
                        {messages.map((msg) => {
                            const isMe = msg.sender === "me";
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    layout
                                    style={{ display: 'flex', width: '100%', justifyContent: isMe ? "flex-end" : "flex-start" }}
                                >
                                    <Box
                                        maxWidth="85%" px={1.5} py={1}
                                        sx={{
                                            bgcolor: isMe ? 'primary.main' : 'white',
                                            color: isMe ? 'white' : 'text.primary',
                                            borderRadius: 2.5,
                                            borderTopRightRadius: isMe ? 4 : 12,
                                            borderTopLeftRadius: !isMe ? 4 : 12,
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                            border: !isMe ? '1px solid #eee' : 'none'
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' }, lineHeight: 1.4 }}>
                                            {msg.text}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}
                        >
                            <Box px={2} py={1.5} bgcolor="white" borderRadius={3} sx={{ borderTopLeftRadius: 4, display: 'flex', gap: 0.5, border: '1px solid #eee' }}>
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, backgroundColor: '#9e9e9e', borderRadius: '50%' }} />
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, backgroundColor: '#9e9e9e', borderRadius: '50%' }} />
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, backgroundColor: '#9e9e9e', borderRadius: '50%' }} />
                            </Box>
                        </motion.div>
                    )}

                    {scriptIndex >= chatScript.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}
                        >
                            <Button variant="contained" color="primary" onClick={onNext} sx={{ borderRadius: 8, px: 5, py: 1.2, fontSize: '1.1rem', boxShadow: '0 8px 16px rgba(216, 27, 96, 0.3)' }}>
                                Дальше
                            </Button>
                        </motion.div>
                    )}
                </Box>

                {/* Chat Input Bar */}
                <Box height={60} bgcolor="#f8f9fa" borderTop="1px solid #ddd" px={2} display="flex" alignItems="center" gap={1.5} pb={1}>
                    <Typography color="primary.main" fontSize={24} fontWeight="bold" sx={{ cursor: 'pointer' }}>+</Typography>
                    <Box flex={1} height={36} borderRadius={4} border="1px solid #ccc" bgcolor="white" display="flex" alignItems="center" px={2}>
                        <Typography variant="body2" color="text.disabled">
                            Сообщение
                        </Typography>
                    </Box>
                    <IconButton color="primary" size="small">
                        <Mic />
                    </IconButton>
                </Box>

                {/* Home Indicator */}
                <Box position="absolute" bottom={0} left={0} right={0} height={20} display="flex" justifyContent="center" alignItems="center" bgcolor="#f8f9fa" zIndex={20}>
                    <Box width="35%" height={4} bgcolor="black" borderRadius={2} mb={0.5} />
                </Box>
            </Box>
        </Box>
    );
}
