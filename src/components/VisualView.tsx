"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function VisualView() {
  const { context, setStage, updateContext } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const data = context.visualize;

  if (!data) return null;

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "challenge", context }),
      });
      
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Failed to run challenge stage");
      
      updateContext("challenge", result.data);
      setStage("challenge");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Color Palette</h3>
        <div className="flex flex-wrap gap-4">
          {data.colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-full border border-zinc-700 shadow-inner" 
                style={{ backgroundColor: c.hex }}
                title={c.usage}
              />
              <div className="text-center">
                <div className="text-xs font-mono text-zinc-300">{c.hex}</div>
                <div className="text-xs text-zinc-500">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-indigo-400 mb-3 uppercase tracking-wider">Typography</h3>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-zinc-500 uppercase">Primary</span>
              <p className="text-2xl text-zinc-100">{data.typography.primary}</p>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase">Secondary</span>
              <p className="text-lg text-zinc-300">{data.typography.secondary}</p>
            </div>
            <p className="text-sm text-zinc-500 italic mt-2">{data.typography.reason}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-indigo-400 mb-2 uppercase tracking-wider">Mood & Imagery</h3>
            <p className="text-zinc-200 text-sm mb-2">{data.mood}</p>
            <p className="text-zinc-400 text-sm italic">{data.imagery}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-rose-400 mb-2 uppercase tracking-wider">Avoid</h3>
            <ul className="flex gap-2 flex-wrap">
              {data.avoidVisuals.map((v, i) => (
                <li key={i} className="text-xs px-2 py-1 bg-rose-500/10 text-rose-400 rounded-md border border-rose-500/20">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext}
          disabled={isProcessing}
          className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          {isProcessing ? "Evaluating..." : "Next: The Challenge"}
        </Button>
      </div>
    </div>
  );
}
