"use client";

import CardStack from "./CardStack";
import { Topic } from "@/data/mockTopics";

interface TopicGridProps {
  topics: Topic[];
  onTopicClick?: (topicId: string) => void;
}

export default function TopicGrid({ topics, onTopicClick }: TopicGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {topics.map((topic) => (
        <CardStack
          key={topic.id}
          topic={topic}
          onClick={onTopicClick}
        />
      ))}
    </div>
  );
}