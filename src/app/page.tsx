"use client";

import { useStore } from "@/lib/store";
import IdeaInput from "@/components/IdeaInput";
import Sidebar from "@/components/Sidebar";
import StageCard from "@/components/StageCard";
import DiscoveryView from "@/components/DiscoveryView";
import PositionView from "@/components/PositionView";
import ShapeView from "@/components/ShapeView";
import VisualView from "@/components/VisualView";
import ChallengeView from "@/components/ChallengeView";
import DeliverView from "@/components/DeliverView";
import BrandKitView from "@/components/BrandKitView";
import { StageName } from "@/lib/types";

export default function Home() {
  const { currentStage } = useStore();

  const renderCurrentView = () => {
    switch (currentStage) {
      case "input":
        return <IdeaInput />;
      case "discover":
        return <StageCard title="Discovery" icon="Search"><DiscoveryView /></StageCard>;
      case "position":
        return <StageCard title="Positioning" icon="Target"><PositionView /></StageCard>;
      case "shape":
        return <StageCard title="Brand Shape" icon="Hexagon"><ShapeView /></StageCard>;
      case "visualize":
        return <StageCard title="Visual System" icon="Palette"><VisualView /></StageCard>;
      case "challenge":
        return <StageCard title="The Challenge" icon="ShieldAlert"><ChallengeView /></StageCard>;
      case "deliver":
        return <StageCard title="Delivery" icon="Rocket"><DeliverView /></StageCard>;
      case "kit":
        return <BrandKitView />;
      default:
        return null;
    }
  };

  if (currentStage === "input") {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        {renderCurrentView()}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">
      <aside className="w-72 border-r border-zinc-800 bg-zinc-900/50 p-6 hidden md:block">
        <Sidebar />
      </aside>
      <section className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-4xl mx-auto">
          {renderCurrentView()}
        </div>
      </section>
    </main>
  );
}
