import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10">
      {/* Refined Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-[#0a0a0a] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:20px_20px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background/50"></div>
      </div>

      <header className="flex h-20 items-center px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Logo />
        <nav className="ml-auto flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Login
          </Link>
          <Link href="/signup">
            <Button className="rounded-full px-6 shadow-lg shadow-primary/20">
              Start Building
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center pt-20 md:pt-32 px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Star className="h-3 w-3 fill-current" />
          <span>New: Phase II Evolution Live</span>
        </div>

        <div className="space-y-8 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Task Management <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
              Redefined.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-2xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 leading-relaxed">
            A professional workspace for your daily goals. Experience the perfect 
            balance of minimalist design and powerful functionality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/30">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-2 bg-background/50 backdrop-blur-sm">
                Live Preview
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 mb-20 max-w-6xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <div className="group relative flex flex-col items-start p-8 rounded-3xl border bg-card/30 backdrop-blur-md transition-all hover:bg-card/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Sync</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-left">
              Real-time updates and optimistic state management keep your tasks in perfect sync across all sessions.
            </p>
          </div>
          
          <div className="group relative flex flex-col items-start p-8 rounded-3xl border bg-card/30 backdrop-blur-md transition-all hover:bg-card/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Core</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-left">
              Enterprise-grade authentication with JWT tokens ensures your data remains private and protected.
            </p>
          </div>

          <div className="group relative flex flex-col items-start p-8 rounded-3xl border bg-card/30 backdrop-blur-md transition-all hover:bg-card/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-6 transition-transform group-hover:scale-110">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pure Focus</h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-left">
              A distraction-free interface designed to help you focus on what truly matters: getting things done.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-12 flex flex-col items-center justify-center border-t bg-card/30 backdrop-blur-sm gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © 2026 Evolution of Todo. Crafted with passion for the modern web.
        </p>
      </footer>
    </div>
  )
}
