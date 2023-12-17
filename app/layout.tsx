import type { Metadata } from 'next';
import './globals.scss'

export const metadata: Metadata = {
  title: 'Create calculator',
  description: 'calculator by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
