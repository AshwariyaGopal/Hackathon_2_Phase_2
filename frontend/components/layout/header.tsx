import Link from "next/link"
import { UserNav } from "@/components/layout/user-nav"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Logo } from "@/components/shared/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/tasks"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              Features
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}