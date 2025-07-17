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
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { reason: "Dyeing Defect", count: 186 },
  { reason: "Weaving Flaw", count: 120 },
  { reason: "Sizing Issue", count: 95 },
  { reason: "Tear/Hole", count: 73 },
  { reason: "Contamination", count: 51 },
  { reason: "Other", count: 30 },
];

const chartConfig = {
  count: {
    label: "Rejections",
    color: "hsl(var(--primary))",
  },
};

export function DefectFrequencyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="reason"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            tickMargin={10}
            width={100}
          />
          <XAxis dataKey="count" type="number" hide />
          <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
          <Bar dataKey="count" radius={5} fill="var(--color-count)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
