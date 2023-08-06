import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Mynote',
  description: 'World most advance note taking app',
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
