"use client";

import { useState } from "react";
import { TabNavigation } from "@/components/navigation";
import { HotTopics, Leaderboard } from "@/components/topics";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hot-topics");

  return (
    <div className="min-h-screen" style={{backgroundColor: "#0B051C"}}>
      {/* Video Section */}
      <div className="w-full h-96 flex items-center justify-center" style={{backgroundColor: "#0B051C"}}>
        <div className="w-full h-full max-w-4xl flex items-center justify-center" style={{backgroundColor: "#0B051C"}}>
          <p className="text-white text-lg">Video Placeholder - Infinite Loop</p>
        </div>
      </div>

      {/* Tab Interface */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === "hot-topics" && <HotTopics />}
          {activeTab === "leaderboard" && <Leaderboard />}
        </div>
      </div>
    </div>
  );
}
