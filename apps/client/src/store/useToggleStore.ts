import { create } from 'zustand';

interface Toggle {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const useToggleStore = create<Toggle>((set) => ({
  toggle: false,
  setToggle: (toggle) => set({ toggle }),
}));

export default useToggleStore;
