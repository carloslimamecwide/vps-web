"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GuideId } from "@/types/course";

export const DISCLOSURE_EVENT = "course:disclosure";

export interface DisclosureEventDetail {
  action: "reveal" | "expand-all" | "collapse-all";
  scope: GuideId;
  target?: string;
}

interface CollapsibleBlockProps {
  id: string;
  className: string;
  initialCollapsed: boolean;
  scope: GuideId;
  kind: "section" | "phase";
  header: ReactNode;
  between?: ReactNode;
  children: ReactNode;
}

export function CollapsibleBlock({
  id,
  className,
  initialCollapsed,
  scope,
  kind,
  header,
  between,
  children,
}: CollapsibleBlockProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const blockRef = useRef<HTMLDivElement>(null);
  const headerClass = kind === "phase" ? "setup-phase-header" : "section-header";
  const contentClass = kind === "phase" ? "phase-content" : "section-content";
  const Heading = kind === "phase" ? "h3" : "h2";

  useEffect(() => {
    function handleDisclosure(event: Event) {
      const detail = (event as CustomEvent<DisclosureEventDetail>).detail;
      if (!detail || detail.scope !== scope) return;

      if (detail.action === "expand-all") {
        setCollapsed(false);
        return;
      }
      if (detail.action === "collapse-all") {
        setCollapsed(true);
        return;
      }

      const targetElement = detail.target
        ? document.getElementById(detail.target)
        : null;
      if (
        detail.action === "reveal" &&
        detail.target &&
        (detail.target === id ||
          (targetElement !== null && blockRef.current?.contains(targetElement)))
      ) {
        setCollapsed(false);
      }
    }

    window.addEventListener(DISCLOSURE_EVENT, handleDisclosure);
    return () => window.removeEventListener(DISCLOSURE_EVENT, handleDisclosure);
  }, [id, scope]);

  const baseClassName = className
    .split(/\s+/)
    .filter((name) => name && name !== "collapsed")
    .join(" ");

  return (
    <div
      ref={blockRef}
      id={id}
      className={`${baseClassName}${collapsed ? " collapsed" : ""}`}
    >
      <div className={headerClass}>
        <Heading className="collapsible-title">
          <button
            id={`${id}-trigger`}
            type="button"
            className="section-toggle-button"
            aria-expanded={!collapsed}
            aria-controls={`${id}-content`}
            onClick={() => setCollapsed((value) => !value)}
          >
            {header}
          </button>
        </Heading>
      </div>
      {between}
      <div id={`${id}-content`} className={contentClass} hidden={collapsed}>
        {children}
      </div>
    </div>
  );
}
