import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const tone = status === "Verificata" || status === "Riconciliata" ? "positive" : status === "Anomalia" ? "danger" : status === "In attesa" ? "neutral" : "warning";
  return <Badge variant="outline" className={cn("whitespace-nowrap border-transparent px-2 py-0.5 text-xs font-medium", tone === "positive" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", tone === "danger" && "bg-rose-500/10 text-rose-700 dark:text-rose-300", tone === "warning" && "bg-amber-500/10 text-amber-700 dark:text-amber-300", tone === "neutral" && "bg-muted text-muted-foreground")}>{status}</Badge>;
}
