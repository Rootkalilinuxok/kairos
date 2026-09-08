"use client";

import { useId } from "react";
import type { MiniChartTone } from "@/core/visualization/mini-chart";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number } | null;

function pathForRange(points: Point[], start: number, end: number) {
  let path = "";
  let drawing = false;

  for (let index = start; index <= end; index += 1) {
    const point = points[index];
    if (!point) {
      drawing = false;
      continue;
    }
    path += `${drawing ? " L" : "M"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    drawing = true;
  }

  return path;
}

function contiguousSegments(points: Point[]) {
  const segments: Array<Array<Exclude<Point, null>>> = [];
  let current: Array<Exclude<Point, null>> = [];

  for (const point of points) {
    if (point) current.push(point);
    else if (current.length) {
      segments.push(current);
      current = [];
    }
  }
  if (current.length) segments.push(current);
  return segments;
}

export function MiniSparkline({
  values,
  tone = "cyan",
  forecastFrom,
  width = 104,
  height = 42,
  showEndPoint = true,
  fill = false,
  accessibleLabel,
  className,
}: {
  values: Array<number | null>;
  tone?: MiniChartTone;
  forecastFrom?: number;
  width?: number;
  height?: number;
  showEndPoint?: boolean;
  fill?: boolean;
  accessibleLabel: string;
  className?: string;
}) {
  const gradientId = `kairos-spark-${useId().replaceAll(":", "")}`;
  const numericValues = values.filter((value): value is number => value !== null && Number.isFinite(value));
  const min = numericValues.length ? Math.min(...numericValues) : 0;
  const max = numericValues.length ? Math.max(...numericValues) : 1;
  const range = Math.max(max - min, 1);
  const padding = 3;
  const points: Point[] = values.map((value, index) => value === null ? null : ({
    x: padding + (index / Math.max(values.length - 1, 1)) * (width - padding * 2),
    y: padding + ((max - value) / range) * (height - padding * 2),
  }));
  const forecastStart = forecastFrom === undefined
    ? undefined
    : Math.max(0, Math.min(values.length - 1, forecastFrom));
  const actualEnd = forecastStart ?? values.length - 1;
  const actualPath = pathForRange(points, 0, actualEnd);
  const forecastPath = forecastStart === undefined ? "" : pathForRange(points, forecastStart, values.length - 1);
  const lastPoint = [...points].reverse().find((point): point is Exclude<Point, null> => point !== null);

  return (
    <svg
      role="img"
      aria-label={accessibleLabel}
      data-mini-chart="sparkline"
      data-tone={tone}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("kairos-mini-chart kairos-mini-sparkline shrink-0 overflow-visible", className)}
    >
      <title>{accessibleLabel}</title>
      {fill ? (
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--mini-chart-solid)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--mini-chart-solid)" stopOpacity="0" />
          </linearGradient>
        </defs>
      ) : null}
      {fill ? contiguousSegments(points).map((segment, index) => {
        if (!segment.length) return null;
        const line = segment.map((point, pointIndex) => `${pointIndex ? "L" : "M"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
        const first = segment[0];
        const last = segment.at(-1)!;
        return <path key={index} d={`${line} L ${last.x.toFixed(2)} ${height} L ${first.x.toFixed(2)} ${height} Z`} fill={`url(#${gradientId})`} />;
      }) : null}
      {actualPath ? <path d={actualPath} className="kairos-mini-line" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /> : null}
      {forecastPath ? <path d={forecastPath} className="kairos-mini-line kairos-mini-line-forecast" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round" /> : null}
      {showEndPoint && lastPoint ? <circle className="kairos-mini-endpoint" cx={lastPoint.x} cy={lastPoint.y} r="2.35" fill="currentColor" /> : null}
    </svg>
  );
}
