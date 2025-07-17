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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, ArrowRight, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const vendors = [
  { id: "V001", name: "EcoFibers Ltd.", category: "Yarn Supplier", rating: 4.8, lastOrder: "2024-07-20", status: "Active" },
  { id: "V002", name: "ColorCraft Dyes", category: "Dyeing Chemicals", rating: 4.5, lastOrder: "2024-07-18", status: "Active" },
  { id: "V003", name: "Green-Threads Inc.", category: "Recycled Fibers", rating: 4.9, lastOrder: "2024-07-21", status: "Active" },
  { id: "V004", name: "YKK Corp", category: "Accessories", rating: 5.0, lastOrder: "2024-07-15", status: "On Hold" },
  { id: "V005", name: "Lenzing AG", category: "Specialty Fibers", rating: 4.7, lastOrder: "2024-07-19", status: "Active" },
  { id: "V006", name: "PrintWorks Co.", category: "Printing Services", rating: 4.2, lastOrder: "2024-06-10", status: "Inactive" },
];

export default function VendorsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Vendors</CardTitle>
          <CardDescription>
            Manage your suppliers and track their performance.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.id}</TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.category}</TableCell>
                <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                        {vendor.rating.toFixed(1)}
                    </div>
                </TableCell>
                <TableCell>{vendor.lastOrder}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                        vendor.status === 'Active' ? 'default' : 
                        vendor.status === 'On Hold' ? 'secondary' : 'outline'
                    }
                    className={
                        vendor.status === 'Active' ? 'bg-accent text-accent-foreground' : ''
                    }
                  >
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><ArrowRight className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Create Purchase Order</DropdownMenuItem>
                            <DropdownMenuItem>Review Performance</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
