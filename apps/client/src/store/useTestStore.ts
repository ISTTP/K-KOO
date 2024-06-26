import { create } from 'zustand';

interface ID {
  id: string;
  setId: (id: string) => void;
}

const useTestStore = create<ID>((set) => ({
  id: "init", //초기값
  setId: (by) => {
    set((state) => ({ id: by }));
  }, 

}));

export default useTestStore;