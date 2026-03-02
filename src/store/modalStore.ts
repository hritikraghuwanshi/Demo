import { create } from "zustand";

type ModalType = "contact" | "request-demo" | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (modalType) => set({ isOpen: true, modalType }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));
