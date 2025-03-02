import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import QueryProvider from '@/components/QueryProvider';
import AuthProvider from '@/components/AuthProvider';
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CryptoTrackPro",
  description: "CryptoTrackPro is a simple and easy to use cryptocurrency tracker.",
  keywords: "crypto, cryptocurrency, tracker, crypto tracker, bitcoin, ethereum, dogecoin, litecoin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>

              <ToastContainer 
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {/* Footer */}
              <footer className="border-t py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                  <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CryptoTrackPro. All rights reserved.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                    <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                    <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </div>
                </div>
              </footer>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
