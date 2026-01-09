"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteTaskModal({ open, onOpenChange, onConfirm }: DeleteTaskModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] border-none shadow-2xl bg-card/95 backdrop-blur-2xl rounded-[32px] p-8 animate-in zoom-in-95 duration-300">
        <DialogHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
            <Trash2 className="h-8 w-8" />
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-3xl font-extrabold tracking-tight">Erase Task?</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground/80">
              This action is permanent and will remove the task from your evolution journey.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-4 mt-6">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 rounded-full font-bold flex-1"
          >
            Keep Task
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            className="h-12 px-6 rounded-full font-bold shadow-xl shadow-destructive/20 transition-all hover:shadow-destructive/30 hover:-translate-y-0.5 flex-1"
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
