import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react'; // ✅ Import for analytics

import { Geist, Geist_Mono } from 'next/font/google';

// Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata
export const metadata = {
  title: 'Ciphergram - At-Home Escape Room Games',
  description: 'An immersive at-home escape room experience from Ciphergram Puzzles',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#1a1a1a'
      }
    ]
  },
  manifest: '/site.webmanifest',
  themeColor: '#1a1a1a',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ciphergram'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Unica+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        <footer className="footer">
          <div className="footer-content">
            <img 
              src="/CIPHERGRAM LOGO ONLY V3 .png" 
              alt="Ciphergram Logo" 
              className="footer-logo" 
            />
            <p>&copy; {new Date().getFullYear()} Ciphergram®. Ciphergram is a Registered Trademark. All rights reserved.</p>
          </div>
        </footer>

        <SpeedInsights />
        <Analytics /> 
      </body>
    </html>
  );
}
