'use server';

/**
 * @fileOverview An AI agent that analyzes production data and provides insights on how to improve efficiency.
 *
 * - generateProductionInsights - A function that generates production insights based on the collected production data.
 * - ProductionInsightsInput - The input type for the generateProductionInsights function.
 * - ProductionInsightsOutput - The return type for the generateProductionInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductionInsightsInputSchema = z.object({
  productionData: z
    .string()
    .describe(
      'A string containing production data, including information about raw materials, finished goods, vendor purchases, job slips, worker output, and quality control logs.'
    ),
});
export type ProductionInsightsInput = z.infer<typeof ProductionInsightsInputSchema>;

const ProductionInsightsOutputSchema = z.object({
  insights: z.array(
    z.object({
      title: z.string().describe('A concise title for the insight.'),
      description: z.string().describe('A detailed explanation of the insight.'),
      priority: z
        .enum(['high', 'medium', 'low'])
        .describe('The priority of the insight based on its potential impact.'),
      recommendations: z
        .array(z.string())
        .describe('Specific, actionable recommendations to address the insight.'),
    })
  ).describe('An array of insights generated from the production data.'),
});
export type ProductionInsightsOutput = z.infer<typeof ProductionInsightsOutputSchema>;

export async function generateProductionInsights(
  input: ProductionInsightsInput
): Promise<ProductionInsightsOutput> {
  return productionInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productionInsightsPrompt',
  input: {schema: ProductionInsightsInputSchema},
  output: {schema: ProductionInsightsOutputSchema},
  prompt: `You are an AI assistant designed to analyze textile production data and provide actionable insights for production managers.

  Analyze the following production data to identify areas for improvement, focusing on quality control and resource allocation. Prioritize insights based on their potential impact on production efficiency and cost savings. Provide specific, actionable recommendations for each insight.

  Production Data:
  {{productionData}}

  Format your response as a JSON array of insights, where each insight includes a title, description, priority (high, medium, or low), and an array of recommendations.
  `,
});

const productionInsightsFlow = ai.defineFlow(
  {
    name: 'productionInsightsFlow',
    inputSchema: ProductionInsightsInputSchema,
    outputSchema: ProductionInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
