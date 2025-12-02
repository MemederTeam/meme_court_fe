"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import VerticalFeed from "@/components/VerticalFeed";
import ErrorBoundary from "@/components/ErrorBoundary";
import { mockReelsData } from "@/data/mockReels";
import { hotTopicsData } from "@/data/mockTopics";

function ReelsContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topic');
  
  // Filter posts by topic if topic parameter exists
  const filteredPosts = topicId 
    ? mockReelsData.filter(post => post.topicId === topicId)
    : mockReelsData;
  
  // Get topic name for display
  const topic = hotTopicsData.find(t => t.id === topicId);
  const topicName = topic ? topic.title : "모든 포스트";

  return (
    <ErrorBoundary>
      <div className="fixed inset-0 bg-black">
        <VerticalFeed 
          posts={filteredPosts} 
          topicName={topicName}
        />
      </div>
    </ErrorBoundary>
  );
}

export default function ReelsPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ReelsContent />
    </Suspense>
  );
}