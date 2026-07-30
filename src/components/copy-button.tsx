"use client";

import { useRef, useState } from "react";

interface CopyButtonProps {
  kind: "command" | "file";
}

async function writeToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) {
      throw new Error("Não foi possível copiar o conteúdo");
    }
  } finally {
    textarea.remove();
  }
}

export function CopyButton({ kind }: CopyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const defaultLabel = kind === "file" ? "Copiar conteúdo" : "Copiar";
  const [label, setLabel] = useState(defaultLabel);

  async function copy() {
    const button = buttonRef.current;
    const container = button?.closest(
      kind === "file" ? ".file-content" : ".command-block",
    );
    const source = container?.querySelector(kind === "file" ? "pre" : "code");
    if (!source) return;

    try {
      await writeToClipboard((source as HTMLElement).innerText ?? source.textContent ?? "");
      setLabel("Copiado");
    } catch {
      setLabel("Erro ao copiar");
    }

    window.setTimeout(() => setLabel(defaultLabel), 2000);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={kind === "file" ? "copy-file-btn" : "copy-btn"}
      onClick={copy}
      aria-live="polite"
    >
      {label}
    </button>
  );
}
