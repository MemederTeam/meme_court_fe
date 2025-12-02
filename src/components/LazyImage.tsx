"use client";

import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  placeholder?: React.ReactNode;
}

export default function LazyImage({ src, alt, className, placeholder }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (!src || hasError) {
    return (
      <div 
        ref={imgRef} 
        className={`${className} bg-gray-600 flex items-center justify-center`}
      >
        {placeholder || <span className="text-gray-400 text-sm">이미지</span>}
      </div>
    );
  }

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-sm">로딩중...</span>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
}