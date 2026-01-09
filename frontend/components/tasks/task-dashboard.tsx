"use client"

import * as React from "react"
import { useTasks } from "@/hooks/use-tasks"
import { TaskList } from "@/components/tasks/task-list"
import { CreateTaskModal } from "@/components/tasks/create-task-modal"
import { EditTaskModal } from "@/components/tasks/edit-task-modal"
import { DeleteTaskModal } from "@/components/tasks/delete-task-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Task } from "@/lib/services/tasks"

interface TaskDashboardProps {
  initialTasks: Task[]
}

export function TaskDashboard({ initialTasks }: TaskDashboardProps) {
  const { tasks, isLoading, addTask, updateTask, deleteTask } = useTasks(initialTasks)
  
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const [editingTask, setEditingTask] = React.useState<Task | null>(null)
  const [deletingTaskId, setDeletingTaskId] = React.useState<string | null>(null)

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Your Tasks
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Manage your daily goals and stay productive.
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="hidden sm:flex rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          <Plus className="mr-2 h-5 w-5" /> Add Task
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onToggle={(id, completed) => updateTask(id, { is_completed: completed })}
        onEdit={(task) => setEditingTask(task)}
        onDelete={(id) => setDeletingTaskId(id)}
        onCreate={() => setIsCreateModalOpen(true)}
      />

      {/* Floating Action Button for Mobile */}
      <Button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl sm:hidden animate-in fade-in zoom-in duration-500 delay-300"
        size="icon"
      >
        <Plus className="h-8 w-8" />
      </Button>

      <CreateTaskModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onAdd={addTask}
      />

      <EditTaskModal
        task={editingTask}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onUpdate={updateTask}
      />

      <DeleteTaskModal
        open={!!deletingTaskId}
        onOpenChange={(open) => !open && setDeletingTaskId(null)}
        onConfirm={() => {
          if (deletingTaskId) {
            deleteTask(deletingTaskId)
            setDeletingTaskId(null)
          }
        }}
      />
    </div>
  )
}
