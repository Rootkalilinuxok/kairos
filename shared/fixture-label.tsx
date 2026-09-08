import { FlaskConical } from "lucide-react";

export function FixtureLabel({ compact = false }: { compact?: boolean }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/7 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 dark:text-sky-300"><FlaskConical className="size-3" />{compact ? "Fixture" : "Dati dimostrativi · Phase 1A"}</span>;
}
