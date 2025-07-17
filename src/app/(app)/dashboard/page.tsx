
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
} from "lucide-react";
import { DefectFrequencyChart } from "@/components/defect-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

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
    { id: 1, type: "INVENTORY", description: "Received 500kg of Cotton Yarn from Supreme Textiles.", time: "2 hours ago" },
    { id: 2, type: "PRODUCTION", description: "Job #JB789 (Weaving) started for Order #ORD112.", time: "3 hours ago" },
    { id: 3, type: "QC", description: "3 units rejected from Batch #B456 for 'dyeing defect'.", time: "5 hours ago" },
    { id: 4, type: "VENDOR", description: "New PO #PO-2024-088 sent to ThreadHouse Inc.", time: "8 hours ago" },
    { id: 5, type: "COMPLIANCE", description: "GOTS audit scheduled for 2024-08-15.", time: "1 day ago" },
];

const TimeframeButtons = ({ timeframe, setTimeframe }: { timeframe: Timeframe, setTimeframe: (tf: Timeframe) => void }) => (
    <div className="flex items-center justify-start gap-2">
        <Button size="sm" variant={timeframe === 'daily' ? 'default' : 'outline'} onClick={() => setTimeframe('daily')}>Daily</Button>
        <Button size="sm" variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>Weekly</Button>
        <Button size="sm" variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>Monthly</Button>
    </div>
);


const KpiCard = ({ title, data }: { title: keyof typeof kpiData, data: typeof kpiData[keyof typeof kpiData] }) => {
    const [timeframe, setTimeframe] = useState<Timeframe>('monthly');
    const currentData = data[timeframe];
    const Icon = data.icon;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{currentData.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                    {currentData.change} from last {timeframe.slice(0, -2)}
                </p>
            </CardHeader>
            <CardContent>
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
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div>
                    {activity.type === "QC" && <Badge variant="destructive">QC</Badge>}
                    {activity.type === "INVENTORY" && <Badge variant="secondary">Inventory</Badge>}
                    {activity.type === "PRODUCTION" && <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">Production</Badge>}
                    {activity.type === "VENDOR" && <Badge variant="outline">Vendor</Badge>}
                    {activity.type === "COMPLIANCE" && <Badge>Compliance</Badge>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
