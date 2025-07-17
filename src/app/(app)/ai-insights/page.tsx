import { AIInsightsGenerator } from "@/components/ai-insights-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Production Insights Generator</CardTitle>
          <CardDescription>
            Paste your raw production data below to generate actionable insights. The AI will analyze the data to identify opportunities for improving efficiency, quality control, and resource allocation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AIInsightsGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
