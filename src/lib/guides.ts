import type { GuideId, GuideMeta, ProgressStoreKey } from "@/types/course";

export const GUIDES: readonly GuideMeta[] = [
  {
    id: "intro",
    key: "00",
    label: "Introdução",
    crumb: "introdução",
    panelClassName: "guide-intro",
    toc: [
      { label: "O que é", target: "intro-oque" },
      { label: "Para quem", target: "intro-quem" },
      { label: "Como usar", target: "intro-como" },
      { label: "Caso real", target: "intro-caso-real" },
      { label: "Mapa", target: "intro-mapa" },
    ],
  },
  {
    id: "devops",
    key: "01",
    label: "Percurso DevOps",
    crumb: "percurso devops",
    panelClassName: "guide-devops",
    toc: [
      { label: "Fundamentos", target: "cat-fundamentos" },
      { label: "Containers", target: "cat-containers" },
      { label: "Bases de dados", target: "cat-database" },
      { label: "CI/CD", target: "cat-cicd" },
      { label: "Deploy", target: "cat-deploy" },
      { label: "Segurança", target: "cat-seguranca" },
      { label: "Servidor web", target: "cat-webserver" },
      { label: "Monitorização", target: "cat-monitoring" },
      { label: "Orquestração", target: "cat-orchestration" },
      { label: "IaC", target: "cat-iac" },
      { label: "Cloud", target: "cat-cloud" },
      { label: "Avançado", target: "cat-advanced" },
    ],
  },
  {
    id: "learning",
    key: "02",
    label: "Aprendizagem",
    crumb: "aprendizagem",
    panelClassName: "guide-learning",
    toc: [
      { label: "Linux", target: "linux-fundamentos" },
      { label: "Docker", target: "docker-oque" },
      { label: "PostgreSQL", target: "postgresql-fundamentos" },
      { label: "CI/CD", target: "cicd-fundamentos" },
      { label: "Deploy", target: "deploy-strategies" },
      { label: "Segurança", target: "seguranca-fundamentos" },
      { label: "Nginx", target: "nginx-fundamentos" },
      { label: "Fim da iniciação", target: "learning-continuation" },
      { label: "Monitorização", target: "monitoring-fundamentos" },
      { label: "Kubernetes", target: "kubernetes-fundamentos" },
      { label: "IaC", target: "iac-fundamentos" },
      { label: "Cloud", target: "cloud-fundamentos" },
      { label: "Resolução de problemas", target: "troubleshooting-fundamentos" },
    ],
  },
  {
    id: "setup",
    key: "03",
    label: "Configuração VPS",
    crumb: "configuração vps",
    panelClassName: "guide-setup",
    toc: Array.from({ length: 10 }, (_, index) => ({
      label: `${index + 1}. ${[
        "Acesso",
        "Utilizadores",
        "Segurança",
        "Docker",
        "Redes",
        "Proxy",
        "SSL",
        "PostgreSQL",
        "CI/CD",
        "Deploy",
      ][index]}`,
      target: `phase-${index + 1}`,
    })),
  },
  {
    id: "vps",
    key: "04",
    label: "Guia VPS",
    crumb: "guia vps",
    toc: [
      { label: "Estrutura", target: "estrutura" },
      { label: "Docker", target: "docker" },
      { label: "PostgreSQL", target: "postgresql" },
      { label: "Serviços", target: "services" },
      { label: "Segurança", target: "seguranca" },
      { label: "Deploy", target: "deploy" },
      { label: "Referência rápida", target: "quickref" },
      { label: "Arquitetura", target: "arquitetura" },
      { label: "SSL", target: "certificados" },
    ],
  },
] as const;

export const GUIDE_IDS = GUIDES.map((guide) => guide.id);

export function isGuideId(value: string | null): value is GuideId {
  return value !== null && GUIDE_IDS.includes(value as GuideId);
}

export function progressStoreForCheckbox(id: string): ProgressStoreKey | null {
  if (id.startsWith("do-")) return "devops-path-progress";
  if (id.startsWith("learn-")) return "learning-progress";
  if (id.startsWith("s-")) return "setup-vps-progress";
  return null;
}
