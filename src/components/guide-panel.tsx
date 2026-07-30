"use client";

import type { ReactNode } from "react";
import { useCourse } from "@/components/course-provider";
import type { GuideId } from "@/types/course";

interface GuidePanelProps {
  id: GuideId;
  className?: string;
  children: ReactNode;
}

export function GuidePanel({ id, className = "", children }: GuidePanelProps) {
  const { activeGuide } = useCourse();
  const active = activeGuide === id;

  return (
    <section
      id={`guide-${id}`}
      className={`guide-panel ${className}${active ? " active" : ""}`}
      hidden={!active}
      aria-hidden={!active}
    >
      {children}
    </section>
  );
}
