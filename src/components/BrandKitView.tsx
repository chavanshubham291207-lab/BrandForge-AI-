"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function BrandKitView() {
  const { context, reset } = useStore();

  const handleDownload = () => {
    try {
      const json = JSON.stringify(context, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `brandkit-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Brand Kit JSON downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download JSON");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto text-center space-y-8 py-12"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/20">
        <span className="text-4xl">🚀</span>
      </div>
      
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Your Brand is Ready to Launch</h1>
        <p className="text-xl text-zinc-400">
          The Anti-Generic Engine has compiled your complete brand system.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-left space-y-6">
        <div>
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Summary</h3>
          <p className="text-zinc-200 leading-relaxed">{context.deliver?.brandSummary}</p>
        </div>
        
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleDownload}
            size="lg"
            className="bg-white text-zinc-900 hover:bg-zinc-200"
          >
            <Download className="w-5 h-5 mr-2" />
            Download JSON Kit
          </Button>
          
          <Button 
            onClick={reset}
            variant="outline"
            size="lg"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Start New Project
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
