import { create } from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],
    updateTasks: (tasks) => set({tasks}),
}));