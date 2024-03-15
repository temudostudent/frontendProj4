import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const actionStore = create (
    persist (
        (set) => ({
            showModal : false,
            updateShowModal : (showModal) => set({showModal}),     
        }),
        {
            name: 'actionStore'
        }

    )
);