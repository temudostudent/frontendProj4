import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create (
    persist (
        (set) => ({
            token:'', //state variable
            updateToken : (token) => set({token}),
            resetUserStore: () => set({ token: ''}),    

            updateUserData: (newUserData) => set({ userData: newUserData }),

            userData:[],
        }),
        {
            name: 'userStore',
            storage: createJSONStorage(() => sessionStorage)
        }

    )
);