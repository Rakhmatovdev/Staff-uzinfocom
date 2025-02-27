/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface State {
  userProfile: {};
  setUserProfile: (page: {}) => void;
}

export const useProfile = create<State>((set: any) => ({
  userProfile: {},
  setUserProfile: (page: any) => set(() => ({ userProfile: page })),
}));
