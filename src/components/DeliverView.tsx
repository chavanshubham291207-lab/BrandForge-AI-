"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, ArrowRight } from "lucide-react";

export default function DeliverView() {
  const { context, setStage } = useStore();
  const data = context.deliver;

  if (!data) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleFinish = () => {
    setStage("kit");
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 p-6 rounded-xl border border-indigo-500/30">
        <h3 className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">Landing Page Headline</h3>
        <div className="flex items-start justify-between gap-4">
          <p className="text-3xl font-bold text-white leading-tight">{data.landingHeadline}</p>
          <Button variant="ghost" size="icon" onClick={() => handleCopy(data.landingHeadline)}>
            <Copy className="w-4 h-4 text-zinc-400" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">One-Line Pitch</h3>
        <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <span className="text-zinc-200">{data.oneLinePitch}</span>
          <Button variant="ghost" size="icon" onClick={() => handleCopy(data.oneLinePitch)}>
            <Copy className="w-4 h-4 text-zinc-400" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(data.socialLaunchPosts).map(([platform, post]) => (
          <div key={platform} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-500 uppercase">{platform}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopy(post as string)}>
                <Copy className="w-3 h-3 text-zinc-400" />
              </Button>
            </div>
            <p className="text-sm text-zinc-300 flex-1 whitespace-pre-wrap">{post as string}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Next Steps</h3>
        <ul className="space-y-2">
          {data.nextSteps.map((step, i) => (
            <li key={i} className="flex gap-3 items-center text-zinc-300 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0">
                {i + 1}
              </div>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end pt-6 border-t border-zinc-800">
        <Button 
          onClick={handleFinish}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
        >
          View Full Brand Kit
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
