import type { MetricVisualSpec } from "@/core/visualization/mini-chart";
import { MiniBars } from "@/components/visuals/mini-bars";
import { MiniRing } from "@/components/visuals/mini-ring";
import { MiniSegment } from "@/components/visuals/mini-segment";
import { MiniSparkline } from "@/components/visuals/mini-sparkline";

export function MetricVisual({ visual, className }: { visual: MetricVisualSpec; className?: string }) {
  if (visual.kind === "sparkline") {
    return <MiniSparkline {...visual} className={className} />;
  }
  if (visual.kind === "bars") {
    return <MiniBars {...visual} className={className} />;
  }
  if (visual.kind === "ring") {
    return <MiniRing {...visual} className={className} />;
  }
  return <MiniSegment {...visual} className={className} />;
}
