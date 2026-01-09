"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Task } from "@/lib/services/tasks"

interface EditTaskModalProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>
}

export function EditTaskModal({ task, open, onOpenChange, onUpdate }: EditTaskModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  if (!task) return null

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string

    await onUpdate(task!.id, { title, description })
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl bg-card/95 backdrop-blur-2xl rounded-[32px] p-8 animate-in zoom-in-95 duration-300">
        <form onSubmit={onSubmit} className="space-y-8">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-3xl font-extrabold tracking-tight">Refine Task</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground/80">
              Update your goals to match your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
                Task Title
              </Label>
              <Input 
                id="edit-title" 
                name="title" 
                defaultValue={task.title} 
                required 
                className="h-14 bg-background/50 border-muted-foreground/20 focus:border-primary text-lg transition-all duration-300 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
                Detailed Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                defaultValue={task.description}
                className="min-h-[120px] bg-background/50 border-muted-foreground/20 focus:border-primary text-base transition-all duration-300 rounded-2xl p-4"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="h-12 px-6 rounded-full font-bold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-10 rounded-full font-bold shadow-xl shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Save Evolution"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
