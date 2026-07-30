"use client";

import { useCourse } from "@/components/course-provider";
import type { ProgressStoreKey } from "@/types/course";

interface ProgressCheckboxProps {
  id: string;
  store: ProgressStoreKey;
}

export function ProgressCheckbox({ id, store }: ProgressCheckboxProps) {
  const { progress, updateProgress } = useCourse();

  return (
    <input
      id={id}
      type="checkbox"
      checked={Boolean(progress[store][id])}
      onChange={(event) => updateProgress(store, id, event.target.checked)}
    />
  );
}
