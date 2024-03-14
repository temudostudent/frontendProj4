import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const taskStore = create (
    persist (
        (set) => ({
            taskStored:[],
            updateTaskStore : (taskStored) => set({taskStored}),     
        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }

    )
);