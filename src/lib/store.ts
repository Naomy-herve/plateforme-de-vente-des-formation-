'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, Badge } from '@/types';

interface AppState {
  cart: string[];
  progress: Record<string, number>;
  notes: Note[];
  badges: Badge[];
  skills: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  setProgress: (id: string, pct: number) => void;
  addNote: (n: Note) => void;
  addSkill: (s: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      cart: [],
      progress: { 'py-101': 64, 'web-201': 22 },
      notes: [],
      skills: ['Python', 'Pandas'],
      badges: [
        { id: 'b1', label: 'Maître Python', earned: true },
        { id: 'b2', label: 'Première certification', earned: true },
        { id: 'b3', label: '10 formations terminées', earned: false },
        { id: 'b4', label: 'Certifié NFT (Polygon)', earned: false },
      ],
      addToCart: (id) => set((s) => ({ cart: s.cart.includes(id) ? s.cart : [...s.cart, id] })),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter(c => c !== id) })),
      setProgress: (id, pct) => set((s) => ({ progress: { ...s.progress, [id]: pct } })),
      addNote: (n) => set((s) => ({ notes: [...s.notes, n] })),
      addSkill: (sk) => set((s) => ({ skills: s.skills.includes(sk) ? s.skills : [...s.skills, sk] })),
    }),
    // Rehydrated on mount by <StoreHydrator /> so the first client render matches the server HTML.
    { name: 'elearn-ai-store', skipHydration: true }
  )
);
