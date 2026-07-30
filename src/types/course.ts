export type GuideId = "intro" | "devops" | "learning" | "setup" | "vps";

export type ProgressStoreKey =
  | "devops-path-progress"
  | "learning-progress"
  | "setup-vps-progress";

export type ProgressState = Record<string, boolean>;

export interface TocItem {
  label: string;
  target: string;
}

export interface GuideMeta {
  id: GuideId;
  key: string;
  label: string;
  crumb: string;
  panelClassName?: string;
  toc: readonly TocItem[];
}
