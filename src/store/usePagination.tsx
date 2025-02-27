/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  examsPerPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
}

export const usePaginationStore = create<PaginationState>((set: any) => ({
  currentPage: 1,
  totalPages: 1,
  examsPerPage: 1,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  setTotalPages: (pages: number) => set(() => ({ totalPages: pages })),
}));
