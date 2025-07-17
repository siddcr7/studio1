
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ScanLine, ArrowRight } from "lucide-react";

const rawMaterials = [
  { id: "RM-001", name: "Organic Cotton Yarn (30s)", supplier: "EcoFibers Ltd.", quantity: 1250, unit: "kg", lastUpdated: "2024-07-20" },
  { id: "RM-002", name: "Natural Indigo Dye", supplier: "ColorCraft Dyes", quantity: 80, unit: "liters", lastUpdated: "2024-07-18" },
  { id: "RM-003", name: "Recycled Polyester Staple", supplier: "Green-Threads Inc.", quantity: 3500, unit: "kg", lastUpdated: "2024-07-21" },
  { id: "RM-004", name: "Tencel Lyocell Fiber", supplier: "Lenzing AG", quantity: 700, unit: "kg", lastUpdated: "2024-07-19" },
  { id: "RM-005", name: "Brass Zippers", supplier: "YKK Corp", quantity: 10000, unit: "units", lastUpdated: "2024-07-15" },
];

const finishedGoods = [
  { id: "FG-101", name: "Men's Denim Jacket", quantity: 580, status: "In Stock", location: "Warehouse A" },
  { id: "FG-102", name: "Women's Floral Scarf", quantity: 1200, status: "In Stock", location: "Warehouse B" },
  { id: "FG-103", name: "Kids T-Shirt (Pack of 3)", quantity: 0, status: "Out of Stock", location: "N/A" },
  { id: "FG-104", name: "Linen Bed Sheet Set", quantity: 350, status: "In Stock", location: "Warehouse A" },
  { id: "FG-201", name: "Sample Batch - Autumn '24", quantity: 45, status: "QC Hold", location: "QC Area" },
];

export default function InventoryPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-start gap-2">
            <Button variant={timeframe === 'daily' ? 'default' : 'outline'} onClick={() => setTimeframe('daily')}>Daily</Button>
            <Button variant={timeframe === 'weekly' ? 'default' : 'outline'} onClick={() => setTimeframe('weekly')}>Weekly</Button>
            <Button variant={timeframe === 'monthly' ? 'default' : 'outline'} onClick={() => setTimeframe('monthly')}>Monthly</Button>
       </div>
      <Tabs defaultValue="raw-materials">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="raw-materials">Raw Materials</TabsTrigger>
            <TabsTrigger value="finished-goods">Finished Goods</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
              <Button variant="outline"><ScanLine className="mr-2 h-4 w-4" />Log with Barcode</Button>
              <Button><PlusCircle className="mr-2 h-4 w-4" />Add New Item</Button>
          </div>
        </div>
        <TabsContent value="raw-materials">
          <Card>
            <CardHeader>
              <CardTitle>Raw Materials</CardTitle>
              <CardDescription>
                Track and manage all incoming raw materials for production.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rawMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.id}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell className="text-right">{`${material.quantity} ${material.unit}`}</TableCell>
                      <TableCell>{material.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finished-goods">
          <Card>
            <CardHeader>
              <CardTitle>Finished Goods</CardTitle>
              <CardDescription>
                Manage inventory of completed products ready for dispatch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {finishedGoods.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                              product.status === 'In Stock' ? 'default' :
                              product.status === 'Out of Stock' ? 'destructive' : 'secondary'
                          }
                          className={
                              product.status === 'In Stock' ? 'bg-accent text-accent-foreground' : ''
                          }>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.location}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
