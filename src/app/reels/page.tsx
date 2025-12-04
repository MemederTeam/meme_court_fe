"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { VerticalFeed } from "@/components/feed";
import { ErrorBoundary } from "@/components/common";
import { ReelPost } from "@/data/mockReels";
// import { hotTopicsData } from "@/data/mockTopics";

function ReelsContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topic');

  const [posts, setPosts] = useState<ReelPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [topicName, setTopicName] = useState("모든 포스트");
  
  useEffect(() => {
    async function fetchPosts() {
      if (!topicId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://meme-court-be.onrender.com'}/hashtags/${topicId}`
        );
        console.log('Response', response);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);

        // 토픽 이름도 가져오기 (옵션)
        // const topicResponse = await fetch(`...`);
        // setTopicName(topicData.name);

      } catch (error) {
        console.error('API 호출 실패:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

      fetchPosts();
    }, [topicId]);

    if (loading) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="font-pixel text-white">Loading...</div>
        </div>
      );
    }

  return (
    <ErrorBoundary>
      <div className="fixed inset-0 bg-black">
        <VerticalFeed 
          posts={posts} 
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
        <div className="font-pixel text-white">Loading...</div>
      </div>
    }>
      <ReelsContent />
    </Suspense>
  );
}