import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, PlusCircle, Download } from "lucide-react";

const documents = [
  { name: "GOTS Certificate", status: "Active", expiry: "2025-08-15", category: "Organic Standard" },
  { name: "ISO 9001:2015 Audit Report", status: "Active", expiry: "2025-01-20", category: "Quality Management" },
  { name: "BSCI Audit Checklist", status: "Upcoming", expiry: "2024-09-30", category: "Social Compliance" },
  { name: "Water Usage Permit", status: "Expired", expiry: "2024-06-01", category: "Environmental" },
  { name: "Chemical Safety Data Sheets", status: "Active", expiry: "N/A", category: "Safety" },
  { name: "Fire Safety Certificate", status: "Active", expiry: "2024-12-31", category: "Safety" },
];

export default function CompliancePage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>;
      case "Upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Vault</h1>
          <p className="text-muted-foreground">
            Track all your certifications and audit documents in one place.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <FileText className="h-8 w-8 text-muted-foreground" />
                {getStatusBadge(doc.status)}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">{doc.name}</CardTitle>
              <CardDescription>{doc.category}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>
                {doc.expiry !== "N/A" ? `Expires: ${doc.expiry}` : "No Expiry"}
              </span>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
