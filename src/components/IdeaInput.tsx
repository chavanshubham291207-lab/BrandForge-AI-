"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const EXAMPLES = [
  "App for students to find teammates",
  "Platform for freelance designers",
  "Community for AI learners",
];

export default function IdeaInput() {
  const { setIdea, setStage, setLoading, updateContext } = useStore();
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = async () => {
    if (!input.trim()) return;
    
    setIdea(input);
    setIsProcessing(true);
    setLoading(true);
    
    try {
      const res = await fetch("/api/run-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "discover", context: { rawIdea: input } }),
      });
      
      const result = await res.json();
      
      if (!res.ok || result.error) {
        throw new Error(result.error || "Failed to run discovery");
      }
      
      updateContext("discover", result.data);
      setStage("discover");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Anti-Generic Engine
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Turn a rough idea into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">launch-ready brand.</span>
        </h1>
        <p className="text-lg text-zinc-400">
          Not a single-prompt generator. A 6-stage AI workflow that interrogates, positions, and designs your brand.
        </p>
      </div>

      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 shadow-2xl">
        <Textarea
          placeholder="Describe your product idea..."
          className="min-h-[120px] text-lg bg-transparent border-none focus-visible:ring-0 resize-none placeholder:text-zinc-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-zinc-800 gap-4">
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
          
          <Button 
            onClick={handleStart} 
            disabled={!input.trim() || isProcessing}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all text-white shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {isProcessing ? "Analyzing..." : "Start Building"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
