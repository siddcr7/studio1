
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  Factory,
  CheckCircle,
  ArrowUp,
  Warehouse,
  AlertTriangle,
  Send,
  CalendarCheck,
} from "lucide-react";
import { DefectFrequencyChart } from "@/components/defect-chart";
import { Button } from '@/components/ui/button';

type Timeframe = 'daily' | 'weekly' | 'monthly';

const kpiData = {
  "Units Produced": {
    icon: Package,
    daily: { value: "+1,200", change: "+5.2%" },
    weekly: { value: "+8,500", change: "+12.5%" },
    monthly: { value: "+23,500", change: "+18.1%" },
  },
  "Production Lines": {
    icon: Factory,
    daily: { value: "5 Active", change: "1 Idle" },
    weekly: { value: "5 Active", change: "1 Idle" },
    monthly: { value: "5 Active", change: "1 Idle" },
  },
  "Quality Pass Rate": {
    icon: CheckCircle,
    daily: { value: "98.5%", change: "+0.2%" },
    weekly: { value: "98.3%", change: "+0.8%" },
    monthly: { value: "98.2%", change: "+1.9%" },
  },
};

const recentActivities = [
    { id: 1, type: "INVENTORY", description: "Received 500kg of Cotton Yarn from Supreme Textiles.", time: "2 hours ago", icon: Warehouse },
    { id: 2, type: "PRODUCTION", description: "Job #JB789 (Weaving) started for Order #ORD112.", time: "3 hours ago", icon: Factory },
    { id: 3, type: "QC", description: "3 units rejected from Batch #B456 for 'dyeing defect'.", time: "5 hours ago", icon: AlertTriangle },
    { id: 4, type: "VENDOR", description: "New PO #PO-2024-088 sent to ThreadHouse Inc.", time: "8 hours ago", icon: Send },
    { id: 5, type: "COMPLIANCE", description: "GOTS audit scheduled for 2024-08-15.", time: "1 day ago", icon: CalendarCheck },
];

const TimeframeButtons = ({ timeframe, setTimeframe }: { timeframe: Timeframe, setTimeframe: (tf: Timeframe) => void }) => (
    <div className="flex items-center justify-start gap-1 rounded-md bg-muted p-1">
        <Button size="sm" variant={timeframe === 'daily' ? 'default' : 'ghost'} onClick={() => setTimeframe('daily')} className="px-2 py-1 h-auto text-xs">Daily</Button>
        <Button size="sm" variant={timeframe === 'weekly' ? 'default' : 'ghost'} onClick={() => setTimeframe('weekly')} className="px-2 py-1 h-auto text-xs">Weekly</Button>
        <Button size="sm" variant={timeframe === 'monthly' ? 'default' : 'ghost'} onClick={() => setTimeframe('monthly')} className="px-2 py-1 h-auto text-xs">Monthly</Button>
    </div>
);

const KpiCard = ({ title, data }: { title: keyof typeof kpiData, data: typeof kpiData[keyof typeof kpiData] }) => {
    const [timeframe, setTimeframe] = useState<Timeframe>('monthly');
    const currentData = data[timeframe];
    const Icon = data.icon;

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-4">
                <div className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="text-2xl font-bold">{currentData.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                    {currentData.change} from last {timeframe.slice(0, -2)}
                </p>
            </CardContent>
            <CardContent className="pt-0">
              <TimeframeButtons timeframe={timeframe} setTimeframe={setTimeframe} />
            </CardContent>
        </Card>
    );
};

export default function DashboardPage() {
  const [defectChartTimeframe, setDefectChartTimeframe] = useState<Timeframe>('monthly');

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {Object.entries(kpiData).map(([title, data]) => (
          <KpiCard key={title} title={title as keyof typeof kpiData} data={data} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle>Defect Frequency Overview</CardTitle>
                    <CardDescription>
                        Top reasons for quality rejection.
                    </CardDescription>
                </div>
                <div className="sm:ml-auto">
                    <TimeframeButtons timeframe={defectChartTimeframe} setTimeframe={setDefectChartTimeframe} />
                </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <DefectFrequencyChart timeframe={defectChartTimeframe} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the latest events across the factory floor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map(activity => {
                const Icon = activity.icon;
                return (
                    <div key={activity.id} className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                    </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
