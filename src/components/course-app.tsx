"use client";

import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  DISCLOSURE_EVENT,
  type DisclosureEventDetail,
} from "@/components/collapsible-block";
import { useCourse } from "@/components/course-provider";
import {
  ESSENTIAL_LEARNING_IDS,
  ESSENTIAL_SETUP_IDS,
  PROGRESS_IDS,
} from "@/content/progress-ids";
import { GUIDES, isGuideId } from "@/lib/guides";
import type { GuideId, ProgressStoreKey } from "@/types/course";

const RESET_MESSAGES: Record<ProgressStoreKey, string> = {
  "devops-path-progress": "Tens a certeza de que queres repor todo o progresso?",
  "learning-progress": "Tens a certeza de que queres repor o progresso da aprendizagem?",
  "setup-vps-progress":
    "Tens a certeza de que queres repor todo o progresso da configuração do VPS?",
};

function progressLevel(percent: number) {
  if (percent === 100) return "level-done";
  if (percent > 0) return "level-progress";
  return "level-todo";
}

function setProgressFill(
  element: HTMLElement | null,
  percent: number,
  baseClass?: string,
) {
  if (!element) return;
  element.style.width = `${percent}%`;
  if (baseClass) element.className = `${baseClass} ${progressLevel(percent)}`;
}

export function CourseApp({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    activeGuide,
    progress,
    resetProgress,
    selectGuide,
    setSidebarOpen,
    sidebarOpen,
  } = useCourse();

  const activeMeta = GUIDES.find((guide) => guide.id === activeGuide) ?? GUIDES[0];
  const devopsDone = PROGRESS_IDS.devops.filter(
    (id) => progress["devops-path-progress"][id],
  ).length;
  const devopsPercent = Math.round((devopsDone / PROGRESS_IDS.devops.length) * 100);
  const essentialLearningDone = ESSENTIAL_LEARNING_IDS.filter(
    (id) => progress["learning-progress"][id],
  ).length;
  const essentialLearningPercent = Math.round(
    (essentialLearningDone / ESSENTIAL_LEARNING_IDS.length) * 100,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>(".devops-category").forEach((category) => {
      const ids = Array.from(
        category.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
        (input) => input.id,
      );
      const done = ids.filter((id) => progress["devops-path-progress"][id]).length;
      const percent = ids.length ? Math.round((done / ids.length) * 100) : 0;
      setProgressFill(
        category.querySelector<HTMLElement>(".cat-bar-fill"),
        percent,
        "cat-bar-fill",
      );
      const label = category.querySelector<HTMLElement>(".cat-progress");
      if (label) label.textContent = `${done}/${ids.length}`;
    });

    setProgressFill(root.querySelector("#globalProgressFill"), devopsPercent);
    const globalLabel = root.querySelector<HTMLElement>("#globalProgressPercent");
    if (globalLabel) globalLabel.textContent = `${devopsPercent}%`;

    const learningDone = ESSENTIAL_LEARNING_IDS.filter(
      (id) => progress["learning-progress"][id],
    ).length;
    const learningPercent = Math.round(
      (learningDone / ESSENTIAL_LEARNING_IDS.length) * 100,
    );
    setProgressFill(root.querySelector("#learningProgressFill"), learningPercent);
    const learningLabel = root.querySelector<HTMLElement>("#learningProgressPercent");
    if (learningLabel) learningLabel.textContent = `${learningPercent}%`;

    root.querySelectorAll<HTMLElement>(".setup-phase").forEach((phase) => {
      const ids = Array.from(
        phase.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'),
        (input) => input.id,
      );
      const done = ids.filter((id) => progress["setup-vps-progress"][id]).length;
      const percent = ids.length ? Math.round((done / ids.length) * 100) : 0;
      setProgressFill(
        phase.querySelector<HTMLElement>(".phase-bar-fill"),
        percent,
        "phase-bar-fill",
      );
      const label = phase.querySelector<HTMLElement>(".phase-progress");
      if (label) label.textContent = `${done}/${ids.length}`;
    });

    const setupDone = ESSENTIAL_SETUP_IDS.filter(
      (id) => progress["setup-vps-progress"][id],
    ).length;
    const setupPercent = Math.round((setupDone / ESSENTIAL_SETUP_IDS.length) * 100);
    setProgressFill(root.querySelector("#setupProgressFill"), setupPercent);
    const setupLabel = root.querySelector<HTMLElement>("#setupProgressPercent");
    if (setupLabel) setupLabel.textContent = `${setupPercent}%`;
  }, [devopsPercent, progress]);

  function emitDisclosure(detail: DisclosureEventDetail) {
    window.dispatchEvent(new CustomEvent(DISCLOSURE_EVENT, { detail }));
  }

  function navigateTo(target: string, scope: GuideId = activeGuide) {
    emitDisclosure({ action: "reveal", scope, target });
    setSidebarOpen(false);
    window.setTimeout(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function handleDelegatedClick(event: ReactMouseEvent<HTMLDivElement>) {
    const actionElement = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-action]",
    );
    if (!actionElement) return;

    const action = actionElement.dataset.action;
    if (action === "switch-guide") {
      const guide = actionElement.dataset.guideTarget ?? null;
      if (isGuideId(guide)) selectGuide(guide);
      return;
    }

    if (action === "reset-progress") {
      const store = actionElement.dataset.progressStore as ProgressStoreKey;
      if (store in RESET_MESSAGES && window.confirm(RESET_MESSAGES[store])) {
        resetProgress(store);
      }
      return;
    }

    if (action === "navigate-to") {
      const target = actionElement.dataset.target;
      const scope = actionElement.dataset.scope ?? null;
      if (target && isGuideId(scope)) navigateTo(target, scope);
      return;
    }

    if (action === "expand-all" || action === "collapse-all") {
      emitDisclosure({
        action: action === "expand-all" ? "expand-all" : "collapse-all",
        scope: "vps",
      });
    }
  }

  return (
    <div ref={rootRef} onClick={handleDelegatedClick}>
      <div className="app-shell">
        <aside className="sidebar" id="sidebar" aria-label="Navegação do guia">
          <button
            type="button"
            className="brand brand-button"
            onClick={() => selectGuide("intro")}
          >
            <span className="brand-name">devops.guia</span>
            <span className="brand-sub">VPS · containers · CI/CD</span>
          </button>

          <div className="side-label">Guia</div>
          <nav className="side-tabs" aria-label="Guias">
            {GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                className={`side-tab${activeGuide === guide.id ? " active" : ""}`}
                onClick={() => selectGuide(guide.id)}
                aria-current={activeGuide === guide.id ? "page" : undefined}
              >
                <span className="tab-key">{guide.key}</span>
                {guide.label}
              </button>
            ))}
          </nav>

          <div className="side-label">Nesta secção</div>
          <nav className="side-toc" aria-label="Nesta secção">
            {activeMeta.toc.map((item) => (
              <button
                key={item.target}
                type="button"
                className="toc-link toc-button"
                onClick={() => navigateTo(item.target)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="side-progress">
            <div className="row">
              <span>Iniciação</span>
              <b>{essentialLearningPercent}%</b>
            </div>
            <div className="sp-bar">
              <div
                className="sp-fill"
                style={{ width: `${essentialLearningPercent}%` }}
              />
            </div>
          </div>

          <div className="side-foot">guia prático · julho de 2026</div>
        </aside>

        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Fechar menu"
          tabIndex={sidebarOpen ? 0 : -1}
          onClick={() => setSidebarOpen(false)}
        />

        <main className="content">
          <div className="crumb">
            guia <span style={{ color: "var(--text-mute)" }}>/</span>{" "}
            <span className="cur">{activeMeta.crumb}</span>
          </div>

          {children}

          <footer>
            <p>Guia prático de DevOps para iniciantes</p>
            <p>atualizado · julho de 2026</p>
          </footer>
        </main>
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={sidebarOpen}
        aria-controls="sidebar"
      />
    </div>
  );
}
