
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

const chartData = {
  daily: [
    { reason: "Dyeing Defect", count: 25 },
    { reason: "Weaving Flaw", count: 15 },
    { reason: "Sizing Issue", count: 10 },
    { reason: "Tear/Hole", count: 8 },
    { reason: "Contamination", count: 5 },
    { reason: "Other", count: 2 },
  ],
  weekly: [
    { reason: "Dyeing Defect", count: 110 },
    { reason: "Weaving Flaw", count: 75 },
    { reason: "Sizing Issue", count: 60 },
    { reason: "Tear/Hole", count: 45 },
    { reason: "Contamination", count: 30 },
    { reason: "Other", count: 15 },
  ],
  monthly: [
    { reason: "Dyeing Defect", count: 186 },
    { reason: "Weaving Flaw", count: 120 },
    { reason: "Sizing Issue", count: 95 },
    { reason: "Tear/Hole", count: 73 },
    { reason: "Contamination", count: 51 },
    { reason: "Other", count: 30 },
  ],
};


const chartConfig = {
  count: {
    label: "Rejections",
    color: "hsl(var(--primary))",
  },
};

type Timeframe = 'daily' | 'weekly' | 'monthly';

export function DefectFrequencyChart({ timeframe = 'monthly' }: { timeframe?: Timeframe }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer>
        <BarChart
          data={chartData[timeframe]}
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
