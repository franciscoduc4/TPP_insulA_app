"use client"

import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showFooter = !["/profile", "/login", "/signup"].includes(pathname)

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pt-[calc(1.5rem+env(safe-area-inset-top))] px-[env(safe-area-inset-left)] pb-[calc(4rem+env(safe-area-inset-bottom))] pr-[env(safe-area-inset-right)]">
            {children}
          </main>
          {showFooter && <Footer />}
        </div>
      </body>
    </html>
  )
}

