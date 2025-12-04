"use client";

import { Topic } from "@/data/mockTopics";

interface CardStackProps {
  topic: Topic;
  onClick?: (topicId: string) => void;
}

export default function CardStack({ topic, onClick }: CardStackProps) {
  const { id, title, post_count, thumbnail_images, popularity, } = topic;
  const displayCards = thumbnail_images.slice(0, 3);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className="font-pixel relative bg-gray-800 border border-gray-600 rounded-lg p-6 h-80 cursor-pointer hover:bg-gray-750 transition-colors"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {popularity && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-400">{popularity}</span>
          </div>
        )}
      </div>
      
      <div className="relative w-full h-48 mb-4 overflow-visible">
        {displayCards.map((imageUrl, index) => (
          <div
            key={`${id}-${index}`}
            className="absolute bg-gray-700 border border-gray-500 rounded-md p-3 shadow-lg"
            style={{
              width: index === 0 ? '75%' : '70%',
              height: index === 0 ? '85%' : '80%',
              top: `${index * 8}px`,
              left: index === 0 ? '0px' : `${50 + index * 30}px`,
              zIndex: displayCards.length - index,
              transform: `rotate(${index * 4}deg)`
            }}
          >
            <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">이미지</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4">
        <span className="text-blue-400 font-bold text-lg">+{post_count}</span>
      </div>
    </div>
  );
}