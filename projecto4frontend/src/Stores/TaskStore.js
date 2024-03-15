import { create } from "zustand";

export const useTaskStore = create((set) => ({
    tasks: [],
    updateTasks: (newTasks) => set({ tasks: newTasks }),    
}));