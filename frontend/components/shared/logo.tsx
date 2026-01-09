import { Zap } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
        <Zap className="h-5 w-5 fill-current" />
      </div>
      <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
        Evolution
      </span>
    </div>
  )
}
