export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { runStage } from "@/lib/pipeline";
import { StageName } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stage, context } = body;

    if (!stage || !context) {
      return NextResponse.json({ error: "Missing stage or context" }, { status: 400 });
    }

    const result = await runStage(stage as StageName, context);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Error (run-stage):", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
