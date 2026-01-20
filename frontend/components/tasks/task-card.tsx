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
    <div className={cn(
      "group flex flex-col sm:flex-row sm:items-center justify-between p-4 transition-all duration-200 hover:bg-gray-50/80 gap-4 sm:gap-0",
      task.is_completed ? "bg-gray-50/50" : "bg-white"
    )}>
      {/* Left: Checkbox & Content */}
      <div className="flex items-start gap-4 flex-1 w-full">
        <Checkbox 
          checked={task.is_completed} 
          onCheckedChange={(checked) => onToggle(task.id, !!checked)}
          className="mt-1 data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400 rounded-full w-5 h-5 border-2 border-gray-300 shrink-0"
        />
        
        <div className="flex flex-col space-y-1 w-full">
          <span className={cn(
            "text-base font-medium transition-all break-all",
            task.is_completed ? "text-gray-400 line-through" : "text-gray-900"
          )}>
            {task.title}
          </span>
          {task.description && (
            <p className={cn(
              "text-sm line-clamp-2 sm:line-clamp-1",
              task.is_completed ? "text-gray-300" : "text-gray-500"
            )}>
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Date & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pl-9 sm:pl-0">
        <div className={cn(
          "flex items-center text-xs whitespace-nowrap",
          task.is_completed ? "text-gray-300" : "text-gray-400"
        )}>
           <Calendar className="mr-1.5 h-3.5 w-3.5" />
           {formatDate(task.created_at)}
        </div>
        
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full" 
            onClick={() => onEdit(task)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full" 
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}