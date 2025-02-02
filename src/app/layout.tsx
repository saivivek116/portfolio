/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './index.css';
import { ThemeProvider } from '../ThemeContext';
export const metadata: Metadata = {
  title: 'Sai Vivek Portfolio',
  description: 'Sai Vivek Vangaveti Portfolio',
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
      <GoogleAnalytics gaId="G-LGSZKT0Y5W" />
    </html >
  )
}