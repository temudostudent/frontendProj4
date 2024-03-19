import { create } from "zustand";

export const useUsersListStore = create((set) => ({
    usersListData: [],
    updateUsersListData: (usersListData) => set({ usersListData }),
}));