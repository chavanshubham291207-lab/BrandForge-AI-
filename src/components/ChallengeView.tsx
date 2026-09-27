"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { AlertTriangle, CheckCircle, RefreshCcw, ArrowRight } from "lucide-react";

export default function ChallengeView() {
  const { context, setStage, updateContext } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const data = context.challenge;

  if (!data) return null;

  const isReady = data.genericityScore < 40 && data.consistencyScore > 70;

  const handleImprove = async () => {
    setIsProcessing(true);
    try {
      // Re-run shape and visualize stages
      toast.loading("Refining brand shape...", { id: "refine" });
      
      const shapeRes = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          stage: "shape", 
          context: { ...context, challenge: data } // Pass feedback
        }),
      });
      const shapeResult = await shapeRes.json();
      if (!shapeRes.ok) throw new Error(shapeResult.error);
      
      toast.loading("Refining visual system...", { id: "refine" });
      
      const visRes = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          stage: "visualize", 
          context: { ...context, shape: shapeResult.data, challenge: data }
        }),
      });
      const visResult = await visRes.json();
      if (!visRes.ok) throw new Error(visResult.error);

      updateContext("shape", shapeResult.data);
      updateContext("visualize", visResult.data);
      toast.success("Brand refined! Re-evaluating...", { id: "refine" });
      
      // We could re-run challenge immediately or send back to shape view
      setStage("shape");
    } catch (error: any) {
      toast.error(error.message, { id: "refine" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "deliver", context }),
      });
      
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || "Failed to run delivery stage");
      
      updateContext("deliver", result.data);
      setStage("deliver");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className={`p-4 rounded-xl border flex items-center gap-3 ${
        isReady ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"
      }`}>
        {isReady ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
        <span className="font-semibold">{data.verdict}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Genericity Score</h3>
          <div className={`text-5xl font-bold ${data.genericityScore > 50 ? 'text-rose-500' : 'text-emerald-500'}`}>
            {data.genericityScore}
          </div>
          <span className="text-xs text-zinc-600 mt-2 block">Lower is better</span>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Consistency Score</h3>
          <div className={`text-5xl font-bold ${data.consistencyScore < 60 ? 'text-amber-500' : 'text-emerald-500'}`}>
            {data.consistencyScore}
          </div>
          <span className="text-xs text-zinc-600 mt-2 block">Higher is better</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">Identified Issues</h3>
        <div className="space-y-3">
          {data.issues.map((issue, i) => (
            <div key={i} className="bg-zinc-800/30 border border-zinc-700/30 p-3 rounded-lg flex items-start gap-3">
              <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                issue.severity === 'high' ? 'bg-rose-500' : 
                issue.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <div>
                <span className="font-medium text-zinc-300 text-sm block">{issue.type}</span>
                <span className="text-zinc-500 text-sm">{issue.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4 border-t border-zinc-800">
        {!isReady && (
          <Button 
            variant="outline"
            onClick={handleImprove}
            disabled={isProcessing}
            className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Auto-Refine Brand
          </Button>
        )}
        
        <Button 
          onClick={handleNext}
          disabled={isProcessing}
          className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
        >
          {isProcessing ? "Processing..." : "Continue to Delivery"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
