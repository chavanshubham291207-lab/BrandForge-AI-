export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { BrandContext } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { context } = body as { context: BrandContext };

    if (!context || !context.deliver) {
      return NextResponse.json({ error: "Incomplete brand context" }, { status: 400 });
    }

    // In a real app we might do more processing here (PDF generation, DB save, etc.)
    // For now we just return the assembled JSON structure.
    const finalKit = {
      generatedAt: new Date().toISOString(),
      brandSystem: context,
    };

    return NextResponse.json(finalKit);
  } catch (error: any) {
    console.error("API Error (finalize):", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
