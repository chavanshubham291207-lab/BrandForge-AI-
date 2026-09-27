"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function DiscoveryView() {
  const { context, setStage, updateContext } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const data = context.discover;

  if (!data) return null;

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "position", context }),
      });
      
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Failed to run positioning");
      
      updateContext("position", result.data);
      setStage("position");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
        <h3 className="text-sm font-medium text-zinc-400 mb-1">Refined Idea</h3>
        <p className="text-lg font-medium text-zinc-100">{data.refinedIdea}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">The Real Problem</h3>
          <p className="text-zinc-300">{data.problem}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">Precise Audience</h3>
          <p className="text-zinc-300">{data.audience}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">User Goals</h3>
        <ul className="list-disc list-inside space-y-1 text-zinc-300">
          {data.goals.map((g, i) => <li key={i}>{g}</li>)}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Constraints</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
            {data.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">Open Questions</h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
            {data.openQuestions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={isProcessing}
          className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          {isProcessing ? "Analyzing..." : "Next: Positioning"}
        </Button>
      </div>
    </div>
  );
}
