import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Diabetes Dashboard",
  description: "A comprehensive diabetes management application"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

import './globals.css'