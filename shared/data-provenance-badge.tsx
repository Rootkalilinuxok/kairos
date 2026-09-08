import type { ContextDataProvenance } from "@/core/context/context-capsule";
import { developmentExperienceConfig } from "@/fixtures/development";
import { cn } from "@/lib/utils";

const provenanceStyles: Record<ContextDataProvenance, string> = {
  actual: "border-provenance-actual/25 bg-provenance-actual/[0.07] text-provenance-actual",
  imported: "border-provenance-imported/25 bg-provenance-imported/[0.07] text-provenance-imported",
  calculated: "border-provenance-calculated/25 bg-provenance-calculated/[0.07] text-provenance-calculated",
  forecast: "border-provenance-forecast/25 bg-provenance-forecast/[0.07] text-provenance-forecast",
  extracted: "border-provenance-extracted/25 bg-provenance-extracted/[0.07] text-provenance-extracted",
  inferred: "border-provenance-inferred/25 bg-provenance-inferred/[0.07] text-provenance-inferred",
  estimated: "border-provenance-estimated/25 bg-provenance-estimated/[0.07] text-provenance-estimated",
  confirmed: "border-provenance-confirmed/25 bg-provenance-confirmed/[0.07] text-provenance-confirmed",
  official: "border-provenance-official/25 bg-provenance-official/[0.07] text-provenance-official",
  fixture: "border-provenance-fixture/25 bg-provenance-fixture/[0.07] text-provenance-fixture",
  missing: "border-provenance-missing/35 bg-transparent text-provenance-missing border-dashed",
};

export function DataProvenanceBadge({ kind, compact = false, className }: { kind: ContextDataProvenance; compact?: boolean; className?: string }) {
  const label = developmentExperienceConfig.provenance[kind];
  return <span data-provenance={kind} className={cn("inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]", provenanceStyles[kind], className)}><span aria-hidden="true" className={cn("size-1 shrink-0 rounded-full bg-current", kind === "forecast" && "rounded-none", kind === "missing" && "bg-transparent ring-1 ring-current")} />{kind === "fixture" ? (compact ? "Fixture" : "DEV fixture") : label}</span>;
}
