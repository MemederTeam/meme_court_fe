"use client";

import { useRouter } from "next/navigation";
import TopicGrid from "./TopicGrid";
import { useState, useEffect } from "react";
import { Topic } from "@/data/mockTopics";

export default function HotTopics() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      async function fetchTopics() {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://meme-court-be.onrender.com'}/hashtags/trending?limit=10`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch topics');
          }

          const data = await response.json();
          setTopics(data);
          console.log('Fetched topics:', data);
        } catch (error) {
          console.error('API 호출 실패:', error);
          setTopics([]); // 에러시 빈 배열
        } finally {
          setLoading(false);
        }
      }

      fetchTopics();
    }, []);

  const handleTopicClick = (topicId: string) => {
    router.push(`/reels?topic=${topicId}`);
  };

  if (loading) {
    return (
      <div className="text-white text-center py-8">
        <p className="font-pixel">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-pixel text-2xl font-bold mb-6 text-white">Hot Topics</h2>
      <TopicGrid topics={topics} onTopicClick={handleTopicClick} />
    </div>
  );
}