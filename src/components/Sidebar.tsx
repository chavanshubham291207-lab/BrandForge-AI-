"use client";

import { useStore } from "@/lib/store";
import { CheckCircle2, CircleDot, Circle } from "lucide-react";
import { StageName } from "@/lib/types";

const STAGES: { id: StageName; label: string }[] = [
  { id: "discover", label: "Discover" },
  { id: "position", label: "Position" },
  { id: "shape", label: "Shape" },
  { id: "visualize", label: "Visualize" },
  { id: "challenge", label: "Challenge" },
  { id: "deliver", label: "Deliver" },
];

export default function Sidebar() {
  const { currentStage, history, setStage } = useStore();

  const handleStageClick = (stageId: StageName) => {
    if (history.includes(stageId)) {
      setStage(stageId);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
          B
        </div>
        <h1 className="font-bold text-xl tracking-tight text-white">BrandForge AI</h1>
      </div>
      
      <nav className="flex flex-col gap-4 mt-8 relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-zinc-800" />
        
        {STAGES.map((stage) => {
          const isCompleted = history.includes(stage.id) && currentStage !== stage.id;
          const isCurrent = currentStage === stage.id;
          const isPending = !history.includes(stage.id) && currentStage !== stage.id;

          return (
            <button
              key={stage.id}
              disabled={isPending}
              onClick={() => handleStageClick(stage.id)}
              className={`flex items-center gap-4 relative z-10 transition-all ${
                isPending ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:opacity-80"
              } ${isCurrent ? "text-indigo-400 font-medium" : "text-zinc-400"}`}
            >
              <div className="bg-zinc-900 rounded-full">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-indigo-500 bg-zinc-900 rounded-full" />
                ) : isCurrent ? (
                  <CircleDot className="w-6 h-6 text-indigo-400 bg-zinc-900 rounded-full animate-pulse" />
                ) : (
                  <Circle className="w-6 h-6 text-zinc-600 bg-zinc-900 rounded-full" />
                )}
              </div>
              <span>{stage.label}</span>
            </button>
          );
        })}
      </nav>
      
      {currentStage === "kit" && (
        <div className="mt-8 text-sm text-zinc-500 border-t border-zinc-800 pt-4">
          All stages completed. Review your brand kit!
        </div>
      )}
    </div>
  );
}
