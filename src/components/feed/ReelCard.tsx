"use client";

import { ReelPost } from "@/data/mockReels";
import { PostInteractions } from "../ui";
import { LazyImage } from "../common";
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
  const { author, content, image_url, created_at, vote_count } = post;

  return (
    <article
      className="w-full h-screen bg-black flex flex-col relative snap-start"
      role="article"
      aria-label={`${author?.display_name || '사용자'}의 포스트`}
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
          {image_url ? (
            <LazyImage
              src={image_url}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="font-pixel-kr w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-lg">이미지 없음</span>
            </div>
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Author Info */}
        <div className="absolute top-16 left-4 right-4 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              {author?.profile_image_url ? (
                <LazyImage
                  src={author.profile_image_url}
                  alt={author.display_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-xs">{author?.display_name?.[0] || '?'}</span>
                </div>
              )}
            </div>
            <div>
              <h4 className="text-white font-semibold">{author?.display_name || '익명'}</h4>
              <p className="text-white/70 text-sm">@{author?.user_name || 'unknown'}</p>
            </div>
            {/* 24hr Change Indicator Placeholder */}
            <div className="ml-auto">
              <span className="font-pixel text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                24hr
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="absolute bottom-20 left-4 right-4 z-20">
          <div className="space-y-3" id={`post-content-${post.id}`}>
            <p className="text-white text-base leading-relaxed">
              {content || '내용 없음'}
            </p>

            {/* Timestamp */}
            <p className="text-white/60 text-xs">
              {created_at ? new Date(created_at).toLocaleString('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Interactions */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-20">
        <PostInteractions
          likes={vote_count.funny}
          // comments={interactions.comments}
          // shares={interactions.shares}
          // views={interactions.views}
          postId={post.id}
        />
      </div> */}
    </article>
  );
});

export default ReelCard;