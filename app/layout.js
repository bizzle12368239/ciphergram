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
  description: 'An immersive at-home escape room experience from Ciphergram Puzzles',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
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
            <p>&copy; {new Date().getFullYear()} Ciphergram®. Cipergram is a Registered Trademark. All rights reserved.</p>
          </div>
        </footer>

        <SpeedInsights />
        <Analytics /> 
      </body>
    </html>
  );
}
