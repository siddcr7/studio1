
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = {
  daily: [
    { reason: "Dyeing", count: 25, fill: "var(--color-chart-1)" },
    { reason: "Weaving", count: 15, fill: "var(--color-chart-2)" },
    { reason: "Sizing", count: 10, fill: "var(--color-chart-3)" },
    { reason: "Tear/Hole", count: 8, fill: "var(--color-chart-4)" },
    { reason: "Other", count: 7, fill: "var(--color-chart-5)" },
  ].sort((a, b) => a.count - b.count),
  weekly: [
    { reason: "Dyeing", count: 110, fill: "var(--color-chart-1)" },
    { reason: "Weaving", count: 75, fill: "var(--color-chart-2)" },
    { reason: "Sizing", count: 60, fill: "var(--color-chart-3)" },
    { reason: "Tear/Hole", count: 45, fill: "var(--color-chart-4)" },
    { reason: "Other", count: 35, fill: "var(--color-chart-5)" },
  ].sort((a, b) => a.count - b.count),
  monthly: [
    { reason: "Dyeing", count: 186, fill: "var(--color-chart-1)" },
    { reason: "Weaving", count: 120, fill: "var(--color-chart-2)" },
    { reason: "Sizing", count: 95, fill: "var(--color-chart-3)" },
    { reason: "Tear/Hole", count: 73, fill: "var(--color-chart-4)" },
    { reason: "Other", count: 81, fill: "var(--color-chart-5)" },
  ].sort((a, b) => a.count - b.count),
};

const chartConfig = {
  count: {
    label: "Rejections",
  },
  'Dyeing': { color: 'hsl(var(--chart-1))' },
  'Weaving': { color: 'hsl(var(--chart-2))' },
  'Sizing': { color: 'hsl(var(--chart-3))' },
  'Tear/Hole': { color: 'hsl(var(--chart-4))' },
  'Other': { color: 'hsl(var(--chart-5))' },
};

type Timeframe = 'daily' | 'weekly' | 'monthly';

export function DefectFrequencyChart({ timeframe = 'monthly' }: { timeframe?: Timeframe }) {
  const data = chartData[timeframe];

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <YAxis
            dataKey="reason"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickMargin={10}
            width={80}
          />
          <XAxis dataKey="count" type="number" hide />
          <ChartTooltip
            cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
