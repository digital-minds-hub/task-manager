import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
};

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
    set({ tasks: savedTasks });
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
}));

export default useTaskStore;
