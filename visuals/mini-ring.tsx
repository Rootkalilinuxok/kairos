"use client";

import type { MiniChartTone } from "@/core/visualization/mini-chart";
import { cn } from "@/lib/utils";

export function MiniRing({
  value,
  max = 100,
  tone = "cyan",
  accessibleLabel,
  size = 44,
  className,
}: {
  value: number;
  max?: number;
  tone?: Extract<MiniChartTone, "cyan" | "amber" | "danger">;
  accessibleLabel: string;
  size?: number;
  className?: string;
}) {
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value / Math.max(max, 1)));

  return (
    <svg
      role="img"
      aria-label={accessibleLabel}
      data-mini-chart="ring"
      data-tone={tone}
      viewBox="0 0 44 44"
      width={size}
      height={size}
      className={cn("kairos-mini-chart kairos-mini-ring shrink-0 overflow-visible", className)}
    >
      <title>{accessibleLabel}</title>
      <circle cx="22" cy="22" r={radius} className="kairos-mini-ring-track" fill="none" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        className="kairos-mini-ring-progress"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}
