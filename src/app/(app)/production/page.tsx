
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, Calendar, Shirt } from "lucide-react";

const jobs = {
  spinning: [
    { id: "SPN-001", order: "ORD-112", material: "Organic Cotton", progress: 100, status: "Completed", operator: "Anil Kumar" },
    { id: "SPN-002", order: "ORD-113", material: "Recycled Polyester", progress: 75, status: "In Progress", operator: "Sunita Sharma" },
  ],
  weaving: [
    { id: "WEV-001", order: "ORD-112", fabric: "12oz Denim", progress: 40, status: "In Progress", operator: "Rajesh Singh" },
    { id: "WEV-002", order: "ORD-114", fabric: "Cotton Twill", progress: 90, status: "In Progress", operator: "Priya Das" },
    { id: "WEV-003", order: "ORD-115", fabric: "Linen Blend", progress: 0, status: "Queued", operator: "N/A" },
  ],
  dyeing: [
    { id: "DYE-001", order: "ORD-114", color: "Navy Blue", progress: 100, status: "Completed", operator: "Kavita Rao" },
    { id: "DYE-002", order: "ORD-115", color: "Olive Green", progress: 25, status: "In Progress", operator: "Manoj Patel" },
  ],
  finishing: [
    { id: "FIN-001", order: "ORD-112", process: "Sanforization", progress: 0, status: "Queued", operator: "N/A" },
  ],
};

const JobCard = ({ job, type }: { job: any; type: string }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{job.id}</CardTitle>
          <CardDescription>Order: {job.order}</CardDescription>
        </div>
        <Badge variant={job.status === 'Completed' ? 'default' : job.status === 'In Progress' ? 'secondary' : 'outline'} className={job.status === 'Completed' ? 'bg-accent text-accent-foreground' : ''}>
          {job.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
            {type === 'spinning' && <><Shirt className="w-4 h-4 mr-2"/> {job.material}</>}
            {type === 'weaving' && <><Shirt className="w-4 h-4 mr-2"/> {job.fabric}</>}
            {type === 'dyeing' && <><Shirt className="w-4 h-4 mr-2"/> {job.color}</>}
            {type === 'finishing' && <><Shirt className="w-4 h-4 mr-2"/> {job.process}</>}
        </div>
         <div className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-2"/>
            Operator: {job.operator}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
            <span className="text-sm">Progress</span>
            <span className="text-sm font-medium">{job.progress}%</span>
        </div>
        <Progress value={job.progress} />
      </div>
    </CardContent>
  </Card>
);

export default function ProductionPage() {
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Digital Job Slips</h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Job
            </Button>
        </div>
        <div className="flex items-center justify-start gap-2">
            <Button variant={timeframe === 'daily' ? 'default' : 'outline'} onClick={() => setTimeframe('daily')}>Daily</Button>
            <Button variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>Weekly</Button>
            <Button variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>Monthly</Button>
       </div>
        <Tabs defaultValue="weaving" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="spinning">Spinning</TabsTrigger>
            <TabsTrigger value="weaving">Weaving</TabsTrigger>
            <TabsTrigger value="dyeing">Dyeing</TabsTrigger>
            <TabsTrigger value="finishing">Finishing</TabsTrigger>
        </TabsList>
        <TabsContent value="spinning">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {jobs.spinning.map(job => <JobCard key={job.id} job={job} type="spinning"/>)}
            </div>
        </TabsContent>
        <TabsContent value="weaving">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {jobs.weaving.map(job => <JobCard key={job.id} job={job} type="weaving"/>)}
            </div>
        </TabsContent>
        <TabsContent value="dyeing">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {jobs.dyeing.map(job => <JobCard key={job.id} job={job} type="dyeing"/>)}
            </div>
        </TabsContent>
        <TabsContent value="finishing">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {jobs.finishing.map(job => <JobCard key={job.id} job={job} type="finishing"/>)}
            </div>
        </TabsContent>
        </Tabs>
    </div>
  );
}
