"use client";

import { useState, useTransition } from "react";
import { generateProductionInsights } from "@/ai/flows/production-insights";
import type { ProductionInsightsOutput } from "@/ai/flows/production-insights";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, AlertTriangle, ListChecks, Loader2 } from "lucide-react";

const sampleData = `
Raw Materials:
- Cotton Yarn: 5000kg received, 4800kg used. Discrepancy: 200kg.
- Indigo Dye: 100L received, 105L recorded usage.

Finished Goods:
- Denim Jackets: 1000 units planned, 950 produced.
- Linen Shirts: 500 units planned, 490 produced.

Vendor Purchases:
- Supreme Textiles (Cotton): Order #123 - 5000kg, delivered on time.
- DyeHard Inc. (Dyes): Order #124 - 100L, delayed by 2 days.

Job Slips & Worker Output:
- Spinning (Shift 1): 2500kg processed by Team A.
- Spinning (Shift 2): 2300kg processed by Team B. Efficiency drop noted.
- Weaving (Job #WJ-78): 1500m woven, 2 operators.
- Dyeing (Batch #DB-45): 500 units, completed.

Quality Control Logs:
- Denim Jackets: 50 units rejected. Reasons: 30 for 'uneven dyeing', 15 for 'stitching errors', 5 for 'fabric tears'.
- Linen Shirts: 10 units rejected. Reasons: 8 for 'weaving defects', 2 for 'color mismatch'.
`;

export function AIInsightsGenerator() {
  const [isPending, startTransition] = useTransition();
  const [insights, setInsights] = useState<ProductionInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productionData, setProductionData] = useState(sampleData.trim());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInsights(null);
    setError(null);

    startTransition(async () => {
      try {
        const result = await generateProductionInsights({ productionData });
        setInsights(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    });
  };
  
  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-400/80 text-yellow-900">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
    }
  };


  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={productionData}
          onChange={(e) => setProductionData(e.target.value)}
          placeholder="Paste your production data here..."
          rows={15}
          className="font-mono text-sm"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insights
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isPending && (
         <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
         </div>
      )}

      {insights && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
            Generated Insights
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {insights.insights.map((insight, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">
                    <div className="flex items-center justify-between w-full pr-4">
                        <span className="font-medium flex-1">{insight.title}</span>
                        {getPriorityBadge(insight.priority)}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 px-2">
                  <p className="text-muted-foreground">{insight.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center"><ListChecks className="mr-2 h-4 w-4" />Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {insight.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
