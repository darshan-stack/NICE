import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GiftGenius AI - Find Perfect Gifts with AI",
  description:
    "Transform gift-giving with intelligent AI recommendations. Get personalized gift suggestions that create lasting memories in seconds.",
  keywords: "AI gifts, gift recommendations, personalized gifts, AI shopping, gift ideas, smart gifts",
  authors: [{ name: "GiftGenius AI Team" }],
  creator: "GiftGenius AI",
  publisher: "GiftGenius AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://giftgenius-ai.com",
    title: "GiftGenius AI - Find Perfect Gifts with AI",
    description: "Transform gift-giving with intelligent AI recommendations",
    siteName: "GiftGenius AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftGenius AI - Find Perfect Gifts with AI",
    description: "Transform gift-giving with intelligent AI recommendations",
    creator: "@giftgeniusai",
  },
  generator: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
