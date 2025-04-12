import './globals.css';

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
  title: 'Ciphergram - At Home Escape Games',
  description: 'Ciphergram - At Home Escape Games',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Unica+One&display=swap" rel="stylesheet" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Ciphergram - At Home Escape Games. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
