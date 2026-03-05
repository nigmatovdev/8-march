"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
    palette: {
        primary: {
            main: "#d81b60", // Deep rose
            light: "#f48fb1",
            dark: "#c2185b",
        },
        secondary: {
            main: "#f8bbd0", // Light pink
        },
        background: {
            default: "transparent", // Kept transparent to let the tailwind gradient bleed through
        },
    },
    typography: {
        fontFamily: "var(--font-montserrat), sans-serif",
        h1: { fontFamily: "var(--font-cormorant), serif" },
        h2: { fontFamily: "var(--font-cormorant), serif" },
        h3: { fontFamily: "var(--font-cormorant), serif" },
        h4: { fontFamily: "var(--font-cormorant), serif" },
        h5: { fontFamily: "var(--font-cormorant), serif" },
        h6: { fontFamily: "var(--font-cormorant), serif" },
        button: {
            fontFamily: "var(--font-montserrat), sans-serif",
            textTransform: "none",
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                },
            },
        },
    },
});

export function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
