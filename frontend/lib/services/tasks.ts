import { apiClient } from "../api";

export interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const taskService = {
  getAll: () => apiClient<Task[]>("/tasks"),
  
  create: async (data: { title: string; description?: string }) => {
    try {
      return await apiClient<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Task creation failed:", error);
      throw error;
    }
  },
    
  update: (id: string, data: Partial<Task>) => 
    apiClient<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    
  delete: (id: string) => 
    apiClient(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
