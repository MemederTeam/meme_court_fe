"use client";

import { useRouter } from "next/navigation";
import TopicGrid from "./TopicGrid";
import { hotTopicsData } from "@/data/mockTopics";

export default function HotTopics() {
  const router = useRouter();

  const handleTopicClick = (topicId: string) => {
    router.push(`/reels?topic=${topicId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Hot Topics</h2>
      <TopicGrid topics={hotTopicsData} onTopicClick={handleTopicClick} />
    </div>
  );
}