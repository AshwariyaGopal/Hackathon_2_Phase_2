"use client"

import { TaskCard } from "./task-card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "./empty-state"
import { Task } from "@/lib/services/tasks"

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  onToggle: (id: string, completed: boolean) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onCreate: () => void
}

export function TaskList({ tasks, isLoading, onToggle, onEdit, onDelete, onCreate }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[140px] w-full" />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return <EmptyState onCreate={onCreate} />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-500">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
