import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create (
    persist (
        (set) => ({
            token:'', //state variable
            updateToken : (token) => set({token})
        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }

    )
);