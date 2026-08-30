"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getItemBySlug } from "@/data/items";

export interface RequestListEntry {
  slug: string;
  quantity: number;
}

interface RequestListContextValue {
  entries: RequestListEntry[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearList: () => void;
  totalCount: number;
}

const RequestListContext = createContext<RequestListContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "massive-creations-request-list";

export function RequestListProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<RequestListEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load whatever was saved from a previous visit. This only runs in the
  // browser (localStorage doesn't exist during server rendering), so we
  // wait for the component to mount before reading it.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEntries(JSON.parse(raw));
      }
    } catch {
      // Corrupt or inaccessible storage — just start with an empty list.
    }
    setHydrated(true);
  }, []);

  // Every time the list changes, save it back to localStorage so it
  // survives a page reload or the visitor closing the tab.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage full or unavailable — the list just won't persist.
    }
  }, [entries, hydrated]);

  function addItem(slug: string, quantity = 1) {
    if (!getItemBySlug(slug)) return;
    setEntries((current) => {
      const existing = current.find((entry) => entry.slug === slug);
      if (existing) {
        return current.map((entry) =>
          entry.slug === slug
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...current, { slug, quantity }];
    });
  }

  function removeItem(slug: string) {
    setEntries((current) => current.filter((entry) => entry.slug !== slug));
  }

  function updateQuantity(slug: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setEntries((current) =>
      current.map((entry) => (entry.slug === slug ? { ...entry, quantity } : entry))
    );
  }

  function clearList() {
    setEntries([]);
  }

  const totalCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <RequestListContext.Provider
      value={{ entries, addItem, removeItem, updateQuantity, clearList, totalCount }}
    >
      {children}
    </RequestListContext.Provider>
  );
}

export function useRequestList() {
  const context = useContext(RequestListContext);
  if (!context) {
    throw new Error("useRequestList must be used within a RequestListProvider");
  }
  return context;
}
