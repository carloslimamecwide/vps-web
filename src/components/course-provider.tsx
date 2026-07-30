"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isGuideId } from "@/lib/guides";
import type {
  GuideId,
  ProgressState,
  ProgressStoreKey,
} from "@/types/course";

type ProgressByStore = Record<ProgressStoreKey, ProgressState>;

interface CourseContextValue {
  activeGuide: GuideId;
  sidebarOpen: boolean;
  progress: ProgressByStore;
  selectGuide: (guide: GuideId) => void;
  setSidebarOpen: (open: boolean) => void;
  updateProgress: (
    store: ProgressStoreKey,
    checkboxId: string,
    checked: boolean,
  ) => void;
  resetProgress: (store: ProgressStoreKey) => void;
}

const EMPTY_PROGRESS: ProgressByStore = {
  "devops-path-progress": {},
  "learning-progress": {},
  "setup-vps-progress": {},
};

const CourseContext = createContext<CourseContextValue | null>(null);

function readProgress(store: ProgressStoreKey): ProgressState {
  try {
    const raw = window.localStorage.getItem(store);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Formato de progresso inválido");
    }

    if (
      store === "learning-progress" &&
      Object.keys(parsed).some((key) => !key.startsWith("learn-"))
    ) {
      throw new Error("Formato antigo de progresso");
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([key, value]) => [key, Boolean(value)]),
    );
  } catch {
    window.localStorage.removeItem(store);
    return {};
  }
}

export function CourseProvider({ children }: { children: ReactNode }) {
  const [activeGuide, setActiveGuide] = useState<GuideId>("intro");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<ProgressByStore>(EMPTY_PROGRESS);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedGuide = window.localStorage.getItem("active-guide");
      if (isGuideId(savedGuide)) setActiveGuide(savedGuide);

      setProgress({
        "devops-path-progress": readProgress("devops-path-progress"),
        "learning-progress": readProgress("learning-progress"),
        "setup-vps-progress": readProgress("setup-vps-progress"),
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", sidebarOpen);
    return () => document.body.classList.remove("sidebar-open");
  }, [sidebarOpen]);

  const selectGuide = useCallback((guide: GuideId) => {
    setActiveGuide(guide);
    setSidebarOpen(false);
    window.localStorage.setItem("active-guide", guide);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateProgress = useCallback(
    (store: ProgressStoreKey, checkboxId: string, checked: boolean) => {
      setProgress((current) => {
        const nextStore = { ...current[store], [checkboxId]: checked };
        window.localStorage.setItem(store, JSON.stringify(nextStore));
        return { ...current, [store]: nextStore };
      });
    },
    [],
  );

  const resetProgress = useCallback((store: ProgressStoreKey) => {
    window.localStorage.removeItem(store);
    setProgress((current) => ({ ...current, [store]: {} }));
  }, []);

  const value = useMemo<CourseContextValue>(
    () => ({
      activeGuide,
      sidebarOpen,
      progress,
      selectGuide,
      setSidebarOpen,
      updateProgress,
      resetProgress,
    }),
    [
      activeGuide,
      progress,
      resetProgress,
      selectGuide,
      sidebarOpen,
      updateProgress,
    ],
  );

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse tem de ser usado dentro de CourseProvider");
  }
  return context;
}
