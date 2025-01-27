/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import './index.css';
import { ThemeProvider } from '../ThemeContext';
export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <div id="root">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html >
  )
}