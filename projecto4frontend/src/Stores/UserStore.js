import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create (
    persist (
        (set) => ({
            token:'', //state variable
            updateToken : (token) => set({token}),
            resetUserStore: () => set({ token: '' , categoriesStored: ''}),
            
            categoriesStored:[],
            updateCategStore : (categoriesStored) => set({categoriesStored}),
        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }

    )
);