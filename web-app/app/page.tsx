import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-radial from-background to-muted opacity-40"></div>
        <div className="container flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              CryptoTrack<span className="text-primary-accent">Pro</span>
            </h1>
            <p className="mx-auto max-w-[700px] pt-4 text-muted-foreground md:text-xl">
              Track cryptocurrency prices in real-time
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary-accent"
            >
              Get Started
            </Link>
            <Link 
              href="#features"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-5 pb-20 bg-secondary/30">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Real-Time Tracking",
                description: "Monitor cryptocurrency prices as they change with our real-time data feed",
                icon: "globe"
              },
              {
                title: "Powerful Search",
                description: "Quickly find any cryptocurrency with our robust search functionality",
                icon: "file"
              },
              {
                title: "Custom Dashboard",
                description: "Create your personalized dashboard to track your favorite cryptocurrencies",
                icon: "window"
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Image
                    src={`/${feature.icon}.svg`}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Track Crypto Prices?</h2>
              <p className="mt-4 max-w-[600px] text-muted-foreground">
                Join thousands of users who are already tracking their favorite cryptocurrencies with our platform.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary-accent"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* 
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
      </footer> */}
    </main>
  );
}