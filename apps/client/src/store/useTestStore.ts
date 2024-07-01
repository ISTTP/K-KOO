import { create } from "zustand";

interface ID {
  id: string;
  setId: (id: string) => void;
}

const useTestStore = create<ID>((set) => ({
  id: "init",
  setId: (by) => {
    set(() => ({ id: by }));
  },
}));

export default useTestStore;
