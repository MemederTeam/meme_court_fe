"use client";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-600 mb-6">
      <button
        onClick={() => setActiveTab("hot-topics")}
        className={`px-6 py-3 font-medium border-b-2 transition-colors ${
          activeTab === "hot-topics"
            ? "border-blue-400 text-blue-400"
            : "border-transparent text-gray-300 hover:text-white"
        }`}
      >
        Hot Topics
      </button>
      <button
        onClick={() => setActiveTab("leaderboard")}
        className={`px-6 py-3 font-medium border-b-2 transition-colors ${
          activeTab === "leaderboard"
            ? "border-blue-400 text-blue-400"
            : "border-transparent text-gray-300 hover:text-white"
        }`}
      >
        Leaderboard
      </button>
    </div>
  );
}