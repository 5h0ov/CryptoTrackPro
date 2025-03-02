'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";
import { useTheme } from "next-themes";
import { Moon, Sun, BarChart2 } from "lucide-react";
import { UserNav } from "@/components/UserNav";
import { usePathname } from 'next/navigation'

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const { user } = useAuthStore();
  const [isDashboard, setIsDashboard] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDashboard(pathname === "/dashboard");
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Link href="/" className="flex items-center gap-2">
            <BarChart2 className="h-6 w-6" />
            <span>CryptoTrackPro</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          

          <Link href="https://5h0ov.github.io/CryptoTrackPro/" className="">
            Docs
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block">
                <Button variant="outline" 
                className={`${isDashboard ? 'hidden': 'block'}`}
                >
                  Dashboard
                </Button>
              </Link>
              <UserNav />
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:block">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}