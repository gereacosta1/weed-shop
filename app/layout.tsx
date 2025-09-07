import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import AgeGate from '@/components/AgeGate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GreenLeaf - Premium Cannabis Delivered | Lab-Tested Quality',
  description: 'Premium cannabis products delivered discreetly to your door. Lab-tested flower, vapes, gummies, and pre-rolls. Licensed dispensary with secure payments.',
  keywords: 'cannabis, dispensary, delivery, CBD, THC, flower, vapes, gummies, lab tested',
  openGraph: {
    title: 'GreenLeaf - Premium Cannabis Delivered',
    description: 'Lab-tested cannabis products delivered discreetly to your door',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreenLeaf - Premium Cannabis Delivered',
    description: 'Lab-tested cannabis products delivered discreetly to your door',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased min-h-screen bg-background")}>
        <ThemeProvider>
          <AgeGate />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              duration: 3000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}