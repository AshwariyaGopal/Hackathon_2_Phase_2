"use client"

import { useState, useEffect, useCallback } from "react"
import { Task, taskService } from "@/lib/services/tasks"
import { toast } from "sonner"

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isLoading, setIsLoading] = useState(initialTasks.length === 0)

  const fetchTasks = useCallback(async () => {
    try {
      if (tasks.length === 0) setIsLoading(true)
      const data = await taskService.getAll()
      setTasks(data)
    } catch {
      toast.error("Failed to fetch tasks")
    } finally {
      setIsLoading(false)
    }
  }, [tasks.length])

  useEffect(() => {
    if (initialTasks.length === 0) {
      fetchTasks()
    } else {
      setIsLoading(false)
    }
  }, [initialTasks, fetchTasks])

  const addTask = async (title: string, description?: string) => {
    try {
      const newTask = await taskService.create({ title, description })
      setTasks([newTask, ...tasks])
      toast.success("Task added")
      return true
    } catch {
      toast.error("Failed to add task")
      return false
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    // Optimistic update
    const previousTasks = [...tasks]
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t))

    try {
      await taskService.update(id, updates)
    } catch {
      setTasks(previousTasks)
      toast.error("Failed to update task")
    }
  }

  const deleteTask = async (id: string) => {
    const previousTasks = [...tasks]
    setTasks(tasks.filter(t => t.id !== id))

    try {
      await taskService.delete(id)
      toast.success("Task deleted")
    } catch {
      setTasks(previousTasks)
      toast.error("Failed to delete task")
    }
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    refresh: fetchTasks
  }
}
