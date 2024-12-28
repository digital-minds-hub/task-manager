import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  updateTask: (id: string, updates: Partial<Task>) => void;
  setTasks: (tasks: Task[]) => void;
  deleteTask: (taskId: string) => void;
};

const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") ?? "[]"),
  setTasks: (newTasks) => {
    set({ tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  updateTask: (id, updates) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
}));

export default useTaskStore;
