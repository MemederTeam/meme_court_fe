"use client";

import { ReelPost } from "@/data/mockReels";
import PostInteractions from "./PostInteractions";
import LazyImage from "./LazyImage";
import { memo } from "react";

interface ReelCardProps {
  post: ReelPost;
  topicName?: string;
  isActive?: boolean;
  postIndex?: number;
  totalPosts?: number;
}

const ReelCard = memo(function ReelCard({ 
  post, 
  topicName, 
  isActive = false, 
  postIndex = 0, 
  totalPosts = 1 
}: ReelCardProps) {
  const { author, content, interactions, timestamp } = post;

  return (
    <article 
      className="w-full h-screen bg-black flex flex-col relative snap-start"
      role="article"
      aria-label={`${author.username}의 포스트`}
      aria-describedby={`post-content-${post.id}`}
      tabIndex={isActive ? 0 : -1}
    >
      {/* Topic Header */}
      {topicName && (
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <h3 className="text-white font-semibold text-lg">{topicName}</h3>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Background Image/Content */}
        <div className="absolute inset-0">
          <LazyImage
            src={content.image}
            alt="Post content"
            className="w-full h-full object-cover"
            placeholder={
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-lg">이미지 없음</span>
              </div>
            }
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Author Info */}
        <div className="absolute top-16 left-4 right-4 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <LazyImage
                src={author.avatar}
                alt={author.username}
                className="w-full h-full object-cover"
                placeholder={
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <span className="text-white text-xs">{author.username[0]}</span>
                  </div>
                }
              />
            </div>
            <div>
              <h4 className="text-white font-semibold">{author.username}</h4>
              <p className="text-white/70 text-sm">{author.handle}</p>
            </div>
            {/* 24hr Change Indicator Placeholder */}
            <div className="ml-auto">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                24hr
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="absolute bottom-20 left-4 right-4 z-20">
          <div className="space-y-3" id={`post-content-${post.id}`}>
            <p className="text-white text-base leading-relaxed">
              {content.text}
            </p>
            
            {/* Tags */}
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-blue-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <p className="text-white/60 text-xs">
              {timestamp}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Interactions */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <PostInteractions
          likes={interactions.likes}
          comments={interactions.comments}
          shares={interactions.shares}
          views={interactions.views}
          postId={post.id}
        />
      </div>
    </article>
  );
});

export default ReelCard;