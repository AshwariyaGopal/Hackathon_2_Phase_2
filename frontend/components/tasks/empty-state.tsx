import { Plus, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-muted-foreground/10 p-12 text-center animate-in fade-in zoom-in duration-700 bg-card/20 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute inset-0 scale-150 blur-3xl opacity-20 bg-primary rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-8 rotate-3 transition-transform hover:rotate-0 duration-500">
          <ListTodo className="h-12 w-12" />
        </div>
      </div>
      <h3 className="text-3xl font-extrabold tracking-tight">Your canvas is empty</h3>
      <p className="mb-8 mt-4 max-w-sm text-lg text-muted-foreground leading-relaxed">
        Ready to take control of your day? Start building your success story one task at a time.
      </p>
      <Button 
        onClick={onCreate} 
        size="lg" 
        className="h-14 px-8 rounded-full text-lg font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all"
      >
        <Plus className="mr-2 h-6 w-6" /> Create First Task
      </Button>
    </div>
  )
}
