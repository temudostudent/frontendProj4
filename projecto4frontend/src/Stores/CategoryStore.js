import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const categoryStore = create (
    persist (
        (set) => ({
            categoriesStored:[],
            updateCategStore : (categoriesStored) => set({categoriesStored}),
    
        }),
        {
            name: 'categoryStore'
        }

    )
);