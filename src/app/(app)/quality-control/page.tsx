
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DefectFrequencyChart } from "@/components/defect-chart";

const rejectionLogs = [
    { id: 'REJ-001', date: '2024-07-21', product: "Men's Denim Jacket", reason: 'Dyeing Defect', quantity: 3, stage: 'Dyeing' },
    { id: 'REJ-002', date: '2024-07-21', product: "Cotton Twill Fabric", reason: 'Weaving Flaw', quantity: 12, stage: 'Weaving' },
    { id: 'REJ-003', date: '2024-07-20', product: "Linen Bed Sheet", reason: 'Sizing Issue', quantity: 5, stage: 'Finishing' },
];

export default function QualityControlPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-2">
            <Button variant={timeframe === 'daily' ? 'default' : 'outline'} onClick={() => setTimeframe('daily')}>Daily</Button>
            <Button variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>Weekly</Button>
            <Button variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>Monthly</Button>
       </div>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log a Rejection</CardTitle>
              <CardDescription>
                Record details of any items that failed quality checks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch-id">Batch / Job ID</Label>
                    <Input id="batch-id" placeholder="e.g., B-789 or WEV-001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g., Men's Denim Jacket" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="reason-code">Reason Code</Label>
                      <Select>
                      <SelectTrigger id="reason-code">
                          <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="dyeing-defect">Dyeing Defect</SelectItem>
                          <SelectItem value="weaving-flaw">Weaving Flaw</SelectItem>
                          <SelectItem value="sizing-issue">Sizing Issue</SelectItem>
                          <SelectItem value="tear-hole">Tear/Hole</SelectItem>
                          <SelectItem value="contamination">Contamination</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Rejected Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Provide additional details..." />
                </div>
                <Button type="submit" className="w-full">Submit Rejection Log</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Defect Frequency Report</CardTitle>
              <CardDescription>
                Rejections by reason in the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DefectFrequencyChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
