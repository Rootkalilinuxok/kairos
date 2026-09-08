"use client";

import type { MiniChartTone } from "@/core/visualization/mini-chart";
import { cn } from "@/lib/utils";

export function MiniSegment({
  values,
  tones,
  accessibleLabel,
  width = 84,
  height = 38,
  className,
}: {
  values: Array<number | null>;
  tones: MiniChartTone[];
  accessibleLabel: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const numericValues = values.filter((value): value is number => value !== null && Number.isFinite(value));
  const max = Math.max(...numericValues, 1);
  const gap = 4;
  const barWidth = Math.max(4, Math.min(7, (width - gap * Math.max(values.length - 1, 0)) / Math.max(values.length, 1)));
  const totalWidth = barWidth * values.length + gap * Math.max(values.length - 1, 0);
  const startX = (width - totalWidth) / 2;

  return (
    <svg
      role="img"
      aria-label={accessibleLabel}
      data-mini-chart="segment"
      viewBox={`0 0 ${width} ${height}`}
      className={cn("kairos-mini-chart kairos-mini-segment shrink-0 overflow-visible", className)}
    >
      <title>{accessibleLabel}</title>
      {values.map((value, index) => {
        if (value === null) return null;
        const barHeight = Math.max(5, (value / max) * (height - 4));
        return (
          <rect
            key={index}
            data-tone={tones[index] ?? tones.at(-1) ?? "amber"}
            x={startX + index * (barWidth + gap)}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            rx="1.5"
            className="kairos-mini-segment-bar"
            style={{ animationDelay: `${index * 18}ms` }}
          />
        );
      })}
    </svg>
  );
}
