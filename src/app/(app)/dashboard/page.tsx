"use client";

import React, { useState } from 'react';
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
  MoreVertical,
} from "lucide-react";
import { DefectFrequencyChart } from "@/components/defect-chart";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Timeframe = 'daily' | 'weekly' | 'monthly';

const kpiData = {
  "Units Produced": {
    icon: Package,
    daily: { value: "1,200", change: "+5.2%" },
    weekly: { value: "8,500", change: "+12.5%" },
    monthly: { value: "23,500", change: "+18.1%" },
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
    { id: 1, type: "INVENTORY", description: "Received 500kg of Cotton Yarn from Supreme Textiles.", time: "2 hours ago", icon: Warehouse, color: "bg-blue-100 text-blue-600" },
    { id: 2, type: "PRODUCTION", description: "Job #JB789 (Weaving) started for Order #ORD112.", time: "3 hours ago", icon: Factory, color: "bg-purple-100 text-purple-600" },
    { id: 3, type: "QC", description: "3 units rejected from Batch #B456 for 'dyeing defect'.", time: "5 hours ago", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
    { id: 4, type: "VENDOR", description: "New PO #PO-2024-088 sent to ThreadHouse Inc.", time: "8 hours ago", icon: Send, color: "bg-green-100 text-green-600" },
    { id: 5, "type": "COMPLIANCE", "description": "GOTS audit scheduled for 2024-08-15.", "time": "1 day ago", "icon": CalendarCheck, color: "bg-yellow-100 text-yellow-600" },
];

const TimeframeButtons = ({ timeframe, setTimeframe, size = "sm" }: { timeframe: Timeframe, setTimeframe: (tf: Timeframe) => void, size?: "sm" | "default" }) => {
    const buttonSize = size === 'sm' ? "px-2.5 py-1 h-auto text-xs" : "px-3 py-1.5 h-auto text-sm";
    return (
    <div className="flex items-center justify-start gap-1 rounded-md bg-muted p-1">
        <Button size="sm" variant={timeframe === 'daily' ? 'secondary' : 'ghost'} onClick={() => setTimeframe('daily')} className={buttonSize}>Daily</Button>
        <Button size="sm" variant={timeframe === 'weekly' ? 'secondary' : 'ghost'} onClick={() => setTimeframe('weekly')} className={buttonSize}>Weekly</Button>
        <Button size="sm" variant={timeframe === 'monthly' ? 'secondary' : 'ghost'} onClick={() => setTimeframe('monthly')} className={buttonSize}>Monthly</Button>
    </div>
)};

const KpiCard = ({ title, data }: { title: keyof typeof kpiData, data: typeof kpiData[keyof typeof kpiData] }) => {
    const [timeframe, setTimeframe] = useState<Timeframe>('monthly');
    const currentData = data[timeframe];
    const Icon = data.icon;

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle>Defect Frequency</CardTitle>
                    <CardDescription>
                        Top reasons for quality rejection.
                    </CardDescription>
                </div>
                <div className="sm:ml-auto">
                    <TimeframeButtons timeframe={defectChartTimeframe} setTimeframe={setDefectChartTimeframe} />
                </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2 pt-4">
            <DefectFrequencyChart timeframe={defectChartTimeframe} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest events across the factory floor.
                </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                    <React.Fragment key={activity.id}>
                        <div className="flex items-start gap-4">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.color}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                        {index < recentActivities.length - 1 && <Separator />}
                    </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
