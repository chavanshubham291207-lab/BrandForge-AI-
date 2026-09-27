import { callLLM } from "./ai";
import { PROMPTS } from "./prompts";
import {
  DiscoverSchema,
  PositionSchema,
  ShapeSchema,
  VisualSchema,
  ChallengeSchema,
  DeliverSchema,
} from "./schemas";
import { StageName } from "./types";
import { z } from "zod";

export const SCHEMAS: Record<StageName, z.ZodType<any, any>> = {
  discover: DiscoverSchema,
  position: PositionSchema,
  shape: ShapeSchema,
  visualize: VisualSchema,
  challenge: ChallengeSchema,
  deliver: DeliverSchema,
};

export async function runStage(stage: StageName, context: any, errorFeedback?: string): Promise<{ success: boolean; data: any; needsRefinement?: boolean; error?: string }> {
  try {
    let prompt = "";
    if (stage === "discover") {
      prompt = PROMPTS.discover(context.rawIdea);
    } else {
      prompt = PROMPTS[stage](context);
    }

    if (errorFeedback) {
      prompt += `\n\nPrevious attempt failed with error: ${errorFeedback}. Please fix it and ensure the output perfectly matches the schema.`;
    }

    const json = await callLLM(prompt);
    
    // Validate with Zod
    const schema = SCHEMAS[stage];
    const parsed = schema.parse(json);

    let needsRefinement = false;
    if (stage === "challenge") {
      if ((parsed as any).genericityScore > 60) {
        needsRefinement = true;
      }
    }

    return { success: true, data: parsed, needsRefinement };
  } catch (error: any) {
    console.error(`Error in stage ${stage}:`, error);
    if (!errorFeedback) {
      // Retry ONCE
      return runStage(stage, context, error.message);
    }
    return { success: false, data: null, error: error.message };
  }
}
