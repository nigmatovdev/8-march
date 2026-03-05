import type { Metadata } from "next"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { ThemeRegistry } from "./ThemeRegistry"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600'],
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "С 8 Марта, Нафиса 🌸",
  description: "Цифровая история любви для Нафисы",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning className={`${cormorant.variable} ${montserrat.variable} antialiased font-sans text-gray-800`}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
