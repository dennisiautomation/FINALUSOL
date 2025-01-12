import { create } from 'zustand';
import { User } from '../types';
import { persist } from 'zustand/middleware';

interface RepresentativesState {
  representatives: User[];
  addRepresentative: (representative: User) => void;
  updateRepresentative: (id: string, data: Partial<User>) => void;
  deleteRepresentative: (id: string) => void;
  getRepresentativeByEmail: (email: string) => User | undefined;
}

export const useRepresentativesStore = create<RepresentativesState>()(
  persist(
    (set, get) => ({
      representatives: [],
      addRepresentative: (representative) =>
        set((state) => ({
          representatives: [...state.representatives, { ...representative, active: true }],
        })),
      updateRepresentative: (id, data) =>
        set((state) => ({
          representatives: state.representatives.map((rep) =>
            rep.id === id ? { ...rep, ...data } : rep
          ),
        })),
      deleteRepresentative: (id) =>
        set((state) => ({
          representatives: state.representatives.filter((rep) => rep.id !== id),
        })),
      getRepresentativeByEmail: (email) => {
        return get().representatives.find(
          (rep) => rep.email === email && rep.active
        );
      },
    }),
    {
      name: 'representatives-storage',
    }
  )
);