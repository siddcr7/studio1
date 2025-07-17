
"use client";

import * as React from "react";
import { Pie, PieChart, Legend } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = {
  daily: [
    { reason: "Dyeing", count: 25, fill: "var(--color-dyeing)" },
    { reason: "Weaving", count: 15, fill: "var(--color-weaving)" },
    { reason: "Sizing", count: 10, fill: "var(--color-sizing)" },
    { reason: "Tear/Hole", count: 8, fill: "var(--color-tear)" },
    { reason: "Other", count: 7, fill: "var(--color-other)" },
  ],
  weekly: [
    { reason: "Dyeing", count: 110, fill: "var(--color-dyeing)" },
    { reason: "Weaving", count: 75, fill: "var(--color-weaving)" },
    { reason: "Sizing", count: 60, fill: "var(--color-sizing)" },
    { reason: "Tear/Hole", count: 45, fill: "var(--color-tear)" },
    { reason: "Other", count: 35, fill: "var(--color-other)" },
  ],
  monthly: [
    { reason: "Dyeing", count: 186, fill: "var(--color-dyeing)" },
    { reason: "Weaving", count: 120, fill: "var(--color-weaving)" },
    { reason: "Sizing", count: 95, fill: "var(--color-sizing)" },
    { reason: "Tear/Hole", count: 73, fill: "var(--color-tear)" },
    { reason: "Other", count: 81, fill: "var(--color-other)" },
  ],
};

const chartConfig = {
  count: {
    label: "Rejections",
  },
  dyeing: {
    label: "Dyeing",
    color: "hsl(var(--chart-1))",
  },
  weaving: {
    label: "Weaving",
    color: "hsl(var(--chart-2))",
  },
  sizing: {
    label: "Sizing",
    color: "hsl(var(--chart-3))",
  },
  tear: {
    label: "Tear/Hole",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

type Timeframe = 'daily' | 'weekly' | 'monthly';

export function DefectFrequencyChart({ timeframe = 'monthly' }: { timeframe?: Timeframe }) {
  const data = chartData[timeframe];
  const totalDefects = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey="count"
          nameKey="reason"
          innerRadius={60}
          strokeWidth={5}
        >
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="reason" />}
          className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
        <div className="absolute top-1/2 left-1/2 -translate-y-[calc(50%_+_1rem)] -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none" aria-hidden="true">
            <span className="text-3xl font-bold tracking-tighter">
                {totalDefects}
            </span>
            <span className="text-xs text-muted-foreground">
                Total Defects
            </span>
        </div>
    </ChartContainer>
  );
}
