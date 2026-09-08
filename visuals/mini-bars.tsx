"use client";

import { useId } from "react";
import type { MiniChartTone } from "@/core/visualization/mini-chart";
import { cn } from "@/lib/utils";

export function MiniBars({
  values,
  tone = "cyan",
  accessibleLabel,
  width = 84,
  height = 38,
  className,
}: {
  values: Array<number | null>;
  tone?: MiniChartTone;
  accessibleLabel: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const gradientId = `kairos-bars-${useId().replaceAll(":", "")}`;
  const numericValues = values.filter((value): value is number => value !== null && Number.isFinite(value));
  const max = Math.max(...numericValues, 1);
  const gap = 3;
  const barWidth = Math.max(3, Math.min(5, (width - gap * Math.max(values.length - 1, 0)) / Math.max(values.length, 1)));
  const totalWidth = barWidth * values.length + gap * Math.max(values.length - 1, 0);
  const startX = (width - totalWidth) / 2;

  return (
    <svg
      role="img"
      aria-label={accessibleLabel}
      data-mini-chart="bars"
      data-tone={tone}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("kairos-mini-chart kairos-mini-bars shrink-0 overflow-visible", className)}
    >
      <title>{accessibleLabel}</title>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--mini-chart-start)" />
          <stop offset="100%" stopColor="var(--mini-chart-end)" />
        </linearGradient>
      </defs>
      {values.map((value, index) => {
        if (value === null) return null;
        const barHeight = Math.max(3, (value / max) * (height - 4));
        return (
          <rect
            key={index}
            x={startX + index * (barWidth + gap)}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            rx="1.4"
            fill={`url(#${gradientId})`}
            className="kairos-mini-bar"
            style={{ animationDelay: `${index * 16}ms` }}
          />
        );
      })}
    </svg>
  );
}
