import { create } from "zustand";

export const useActionsStore = create((set) => ({
    showModal : false,
    updateShowModal : (showModal) => set({showModal}),    
    
    showSidebar : true,
    updateShowSidebar : (showSidebar) => set({showSidebar}),

    isEditing : false,
    updateIsEditing : (isEditing) => set({isEditing}),
}));