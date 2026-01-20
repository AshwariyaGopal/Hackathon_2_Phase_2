import Link from "next/link"
import { UserNav } from "@/components/layout/user-nav"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Logo } from "@/components/shared/logo"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-8">
        <div className="mr-2 md:mr-4 flex">
          <Link href="/" className="mr-4 md:mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-4 md:space-x-6 text-sm font-medium">
            <Link
              href="/tasks"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search could go here */}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
}
