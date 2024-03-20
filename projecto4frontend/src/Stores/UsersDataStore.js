import { create } from "zustand";

export const useUsersListStore = create((set) => ({
    usersListData: [],
    selectedUser:null,
    updateUsersListData: (usersListData) => set({ usersListData }),
    setSelectedUser: (selectedUser) => set({ selectedUser })
}));