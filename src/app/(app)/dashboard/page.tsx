
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

const kpiData = {
  daily: [
    { title: "Units Produced", value: "+1,200", change: "+5.2%", icon: Package },
    { title: "Production Lines", value: "5 Active", change: "1 Idle", icon: Factory },
    { title: "Quality Pass Rate", value: "98.5%", change: "+0.2%", icon: CheckCircle },
  ],
  weekly: [
    { title: "Units Produced", value: "+8,500", change: "+12.5%", icon: Package },
    { title: "Production Lines", value: "5 Active", change: "1 Idle", icon: Factory },
    { title: "Quality Pass Rate", value: "98.3%", change: "+0.8%", icon: CheckCircle },
  ],
  monthly: [
    { title: "Units Produced", value: "+23,500", change: "+18.1%", icon: Package },
    { title: "Production Lines", value: "5 Active", change: "1 Idle", icon: Factory },
    { title: "Quality Pass Rate", value: "98.2%", change: "+1.9%", icon: CheckCircle },
  ]
};

const recentActivities = [
    { id: 1, type: "INVENTORY", description: "Received 500kg of Cotton Yarn from Supreme Textiles.", time: "2 hours ago" },
    { id: 2, type: "PRODUCTION", description: "Job #JB789 (Weaving) started for Order #ORD112.", time: "3 hours ago" },
    { id: 3, type: "QC", description: "3 units rejected from Batch #B456 for 'dyeing defect'.", time: "5 hours ago" },
    { id: 4, type: "VENDOR", description: "New PO #PO-2024-088 sent to ThreadHouse Inc.", time: "8 hours ago" },
    { id: 5, type: "COMPLIANCE", description: "GOTS audit scheduled for 2024-08-15.", time: "1 day ago" },
];

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const currentKpis = kpiData[timeframe];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-start gap-2">
            <Button variant={timeframe === 'daily' ? 'default' : 'outline'} onClick={() => setTimeframe('daily')}>Daily</Button>
            <Button variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>Weekly</Button>
            <Button variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>Monthly</Button>
       </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {currentKpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                {kpi.change} from last {timeframe.slice(0, -2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Defect Frequency Overview</CardTitle>
            <CardDescription>
              Top reasons for quality rejection in the last 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <DefectFrequencyChart />
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
