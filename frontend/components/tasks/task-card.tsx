import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox" 
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Task } from "@/lib/services/tasks"

interface TaskCardProps {
  task: Task
  onToggle: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 border-muted-foreground/10 bg-card/50 backdrop-blur-sm rounded-2xl",
      task.is_completed && "bg-muted/30 border-muted/20 shadow-none"
    )}>
      {/* Status Bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-500",
        task.is_completed ? "bg-muted-foreground/30" : "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
      )} />

      <CardHeader className="flex flex-row items-start space-y-0 gap-4 p-5">
        <Checkbox 
          checked={task.is_completed} 
          onCheckedChange={(checked) => onToggle(task.id, !!checked)}
          className="mt-1 h-5 w-5 rounded-full border-2 transition-all data-[state=checked]:scale-110 duration-300"
        />
        <div className="flex-1 space-y-1.5">
          <CardTitle className={cn(
            "text-lg font-bold tracking-tight transition-all duration-500",
            task.is_completed && "line-through text-muted-foreground decoration-2"
          )}>
            {task.title}
          </CardTitle>
          {task.description && (
            <p className={cn(
              "text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed transition-all",
              task.is_completed && "text-muted-foreground/40"
            )}>
              {task.description}
            </p>
          )}
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <Calendar className="mr-1.5 h-3 w-3" />
          {formatDate(task.created_at)}
        </div>
        <div className="flex gap-1 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full bg-background/80 shadow-sm" onClick={() => onEdit(task)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-9 w-9 rounded-full text-destructive hover:text-destructive bg-background/80 shadow-sm" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
