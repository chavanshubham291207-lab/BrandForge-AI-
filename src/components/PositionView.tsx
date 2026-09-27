"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function PositionView() {
  const { context, setStage, updateContext } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const data = context.position;

  if (!data) return null;

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "shape", context }),
      });
      
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Failed to run shape stage");
      
      updateContext("shape", result.data);
      setStage("shape");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-xl border border-indigo-500/20 text-center">
        <h3 className="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">Value Proposition</h3>
        <p className="text-2xl font-bold text-zinc-100">{data.valueProp}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 bg-zinc-900 border-zinc-800">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Category</h3>
          <p className="text-zinc-200 font-medium">{data.category}</p>
        </Card>
        
        <Card className="p-4 bg-zinc-900 border-zinc-800">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Target Segment</h3>
          <p className="text-zinc-200 font-medium">{data.targetSegment}</p>
        </Card>

        <Card className="p-4 bg-zinc-900 border-zinc-800">
          <h3 className="text-xs font-medium text-purple-400 uppercase tracking-wider mb-2">Differentiator</h3>
          <p className="text-zinc-200">{data.differentiator}</p>
        </Card>
        
        <Card className="p-4 bg-zinc-900 border-zinc-800">
          <h3 className="text-xs font-medium text-pink-400 uppercase tracking-wider mb-2">Competitive Angle</h3>
          <p className="text-zinc-200">{data.competitiveAngle}</p>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={isProcessing}
          className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          {isProcessing ? "Designing..." : "Next: Brand Shape"}
        </Button>
      </div>
    </div>
  );
}
