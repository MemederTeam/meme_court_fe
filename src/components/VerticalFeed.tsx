"use client";

import { useEffect, useRef } from "react";
import { ReelPost } from "@/data/mockReels";
import ReelCard from "./ReelCard";
import { useFeedStore } from "@/store/feedStore";
import ErrorBoundary from "./ErrorBoundary";

interface VerticalFeedProps {
  posts: ReelPost[];
  topicName?: string;
}

export default function VerticalFeed({ posts, topicName }: VerticalFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    currentIndex, 
    setCurrentIndex, 
    setTotalPosts, 
    initializeInteractions,
    visibleRange 
  } = useFeedStore();

  // Initialize store with posts data
  useEffect(() => {
    if (posts.length > 0) {
      setTotalPosts(posts.length);
      initializeInteractions(posts);
    }
  }, [posts, setTotalPosts, initializeInteractions]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const newIndex = Math.round(scrollTop / containerHeight);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < posts.length) {
        setCurrentIndex(newIndex);
      }
    };

    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!container) return;
        
        const containerHeight = container.clientHeight;
        const targetScrollTop = currentIndex * containerHeight;
        
        isScrolling = true;
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isScrolling = false;
        }, 300);
      }, 100);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('scrollend', handleScrollEnd);
    container.addEventListener('touchend', handleScrollEnd);
    container.addEventListener('mouseup', handleScrollEnd);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('scrollend', handleScrollEnd);
      container.removeEventListener('touchend', handleScrollEnd);
      container.removeEventListener('mouseup', handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, posts.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < posts.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, posts.length]);

  // Auto-scroll to current index
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerHeight = container.clientHeight;
    const targetScrollTop = currentIndex * containerHeight;
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      role="region"
      aria-label="세로 스크롤 포스트 피드"
      aria-live="polite"
      aria-describedby="feed-instructions"
    >
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Screen reader instructions */}
      <div 
        id="feed-instructions" 
        className="sr-only"
        aria-hidden="true"
      >
        위아래 화살표 키나 스크롤로 포스트를 탐색할 수 있습니다. 현재 {currentIndex + 1}번째 포스트, 총 {posts.length}개 포스트
      </div>

      {posts.map((post, index) => {
        // Performance optimization: only render visible posts
        const isVisible = index >= visibleRange[0] && index <= visibleRange[1];
        
        if (!isVisible) {
          return (
            <div 
              key={post.id} 
              className="w-full h-screen bg-black snap-start"
              aria-hidden="true"
            />
          );
        }
        
        return (
          <ErrorBoundary key={post.id}>
            <ReelCard 
              post={post} 
              topicName={index === 0 ? topicName : undefined}
              isActive={index === currentIndex}
              postIndex={index}
              totalPosts={posts.length}
            />
          </ErrorBoundary>
        );
      })}
      
      {/* Progress Indicator */}
      <div 
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-30"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={posts.length}
        aria-label={`포스트 진행률: ${currentIndex + 1}/${posts.length}`}
      >
        <div className="flex flex-col space-y-2">
          {posts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-8 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}