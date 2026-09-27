"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ShapeView() {
  const { context, setStage, updateContext } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const data = context.shape;

  if (!data) return null;

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "visualize", context }),
      });
      
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Failed to run visualize stage");
      
      updateContext("visualize", result.data);
      setStage("visualize");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Personality Traits</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.traits.map((t, i) => (
            <div key={i} className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
              <span className="font-semibold text-zinc-200 block mb-1">{t.trait}</span>
              <span className="text-sm text-zinc-400">{t.rationale}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Naming Directions</h3>
        <div className="flex flex-col gap-3">
          {data.names.map((n, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div>
                <span className="text-xl font-bold text-white mr-3">{n.name}</span>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-800">{n.style}</Badge>
              </div>
              <span className="text-sm text-zinc-500 text-right max-w-[200px] truncate" title={n.rationale}>
                {n.rationale}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-emerald-400 mb-3 uppercase tracking-wider">Voice: Do</h3>
          <ul className="space-y-2">
            {data.voice.do.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium text-rose-400 mb-3 uppercase tracking-wider">Voice: Don't</h3>
          <ul className="space-y-2">
            {data.voice.dont.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                <span className="text-rose-500 mt-0.5">✗</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={isProcessing}
          className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          {isProcessing ? "Visualizing..." : "Next: Visual System"}
        </Button>
      </div>
    </div>
  );
}
