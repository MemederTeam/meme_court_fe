"use client";

import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export default function LazyImage({ src, alt, className = '', placeholder }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`${className} bg-gray-900`}>
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {(!isInView || !isLoaded) && !hasError && (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-gray-500 text-sm">
            {placeholder || '이미지 로딩 중...'}
          </div>
        </div>
      )}
      {hasError && (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-gray-500 text-sm">이미지를 불러올 수 없습니다</div>
        </div>
      )}
    </div>
  );
}