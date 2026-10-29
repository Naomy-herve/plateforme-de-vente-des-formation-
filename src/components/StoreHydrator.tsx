'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export default function StoreHydrator() {
  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);
  return null;
}
