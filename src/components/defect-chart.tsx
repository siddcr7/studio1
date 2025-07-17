
"use client";

import * as React from "react";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
} as const;

type Timeframe = 'daily' | 'weekly' | 'monthly';

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={fill}
        strokeWidth={1}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))" className="text-sm">
        {`${payload.reason} (${value})`}
      </text>
    </g>
  );
};


export function DefectFrequencyChart({ timeframe = 'monthly' }: { timeframe?: Timeframe }) {
  const data = chartData[timeframe];
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const totalDefects = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  }

  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px]"
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
            outerRadius={80}
            strokeWidth={2}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            label={({
              value,
              percent,
            }) => `${(percent * 100).toFixed(0)}%`}
          >
          </Pie>
           <ChartLegend
            content={<ChartLegendContent nameKey="reason" />}
            className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%_+_2rem)] flex flex-col items-center justify-center pointer-events-none" 
          aria-hidden="true">
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
