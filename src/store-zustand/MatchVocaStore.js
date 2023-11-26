import { create } from "zustand";

const useMatchVocaStore = create((set) => ({
  alphabetVocaChoose: [],
  selectAlphabetVocaChoose: (newAlphabet) =>
    set((state) => ({
      alphabetVocaChoose: [...state.alphabetVocaChoose, newAlphabet],
    })),
  deleteAllSelectAlphabetVocaChoose: () =>
    set((state) => ({
      alphabetVocaChoose: [],
    })),
}));

export default useMatchVocaStore;
