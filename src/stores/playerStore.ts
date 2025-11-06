import { create } from "zustand";
import { Movie } from "@/lib/tmdb";

interface PlayerState {
  isPlaying: boolean;
  currentMovie: Movie | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMovie: (movie: Movie | null) => void;
  playMovie: (movie: Movie) => void;
  stopPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentMovie: null,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMovie: (currentMovie) => set({ currentMovie }),
  playMovie: (movie) => set({ currentMovie: movie, isPlaying: true }),
  stopPlayer: () => set({ currentMovie: null, isPlaying: false }),
}));
