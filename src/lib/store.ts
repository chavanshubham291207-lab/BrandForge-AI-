import { create } from "zustand";
import { BrandContext, StageName } from "./types";

interface AppState {
  currentStage: StageName | "input" | "kit";
  rawIdea: string;
  context: BrandContext;
  isLoading: boolean;
  error: string | null;
  history: string[];
  setIdea: (idea: string) => void;
  setStage: (stage: StageName | "input" | "kit") => void;
  updateContext: (stage: StageName, data: any) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentStage: "input",
  rawIdea: "",
  context: {},
  isLoading: false,
  error: null,
  history: [],
  
  setIdea: (idea) => set({ rawIdea: idea }),
  
  setStage: (stage) => set((state) => ({ 
    currentStage: stage,
    history: [...state.history, stage]
  })),
  
  updateContext: (stage, data) => set((state) => ({
    context: {
      ...state.context,
      [stage]: data,
    },
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set({
    currentStage: "input",
    rawIdea: "",
    context: {},
    isLoading: false,
    error: null,
    history: [],
  }),
}));
