"use client";

import { motion } from "framer-motion";
import { Search, Target, Hexagon, Palette, ShieldAlert, Rocket } from "lucide-react";

const ICONS = {
  Search,
  Target,
  Hexagon,
  Palette,
  ShieldAlert,
  Rocket,
};

export default function StageCard({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: keyof typeof ICONS; 
  children: React.ReactNode;
}) {
  const Icon = ICONS[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400">
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-white tracking-tight">{title}</h2>
      </div>
      
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-6 shadow-xl">
        {children}
      </div>
    </motion.div>
  );
}
