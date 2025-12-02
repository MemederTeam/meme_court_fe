import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PostInteraction {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
}

interface FeedState {
  // Navigation state
  currentIndex: number;
  totalPosts: number;
  isNavigating: boolean;
  
  // Post interactions
  postInteractions: Record<string, PostInteraction>;
  
  // Performance optimization
  visibleRange: [number, number];
  
  // Actions
  setCurrentIndex: (index: number) => void;
  setTotalPosts: (total: number) => void;
  setNavigating: (isNavigating: boolean) => void;
  
  // Interaction actions
  toggleLike: (postId: string, currentLikes: number) => void;
  incrementViews: (postId: string, currentViews: number) => void;
  updateInteraction: (postId: string, interaction: Partial<PostInteraction>) => void;
  
  // Performance actions
  setVisibleRange: (range: [number, number]) => void;
  
  // Bulk actions for performance
  initializeInteractions: (posts: Array<{ id: string; interactions: any }>) => void;
  resetFeed: () => void;
}

export const useFeedStore = create<FeedState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentIndex: 0,
      totalPosts: 0,
      isNavigating: false,
      postInteractions: {},
      visibleRange: [0, 2],
      
      // Navigation actions
      setCurrentIndex: (index: number) => {
        set({ currentIndex: index }, false, 'setCurrentIndex');
        
        // Update visible range for performance
        const { totalPosts } = get();
        const start = Math.max(0, index - 1);
        const end = Math.min(totalPosts - 1, index + 1);
        get().setVisibleRange([start, end]);
      },
      
      setTotalPosts: (total: number) => 
        set({ totalPosts: total }, false, 'setTotalPosts'),
      
      setNavigating: (isNavigating: boolean) => 
        set({ isNavigating }, false, 'setNavigating'),
      
      // Interaction actions
      toggleLike: (postId: string, currentLikes: number) => {
        const current = get().postInteractions[postId];
        const isLiked = current?.isLiked || false;
        
        set(
          (state) => ({
            postInteractions: {
              ...state.postInteractions,
              [postId]: {
                ...current,
                likes: isLiked ? currentLikes - 1 : currentLikes + 1,
                isLiked: !isLiked,
              },
            },
          }),
          false,
          'toggleLike'
        );
      },
      
      incrementViews: (postId: string, currentViews: number) => {
        const current = get().postInteractions[postId];
        
        set(
          (state) => ({
            postInteractions: {
              ...state.postInteractions,
              [postId]: {
                ...current,
                views: currentViews + 1,
              },
            },
          }),
          false,
          'incrementViews'
        );
      },
      
      updateInteraction: (postId: string, interaction: Partial<PostInteraction>) => {
        set(
          (state) => ({
            postInteractions: {
              ...state.postInteractions,
              [postId]: {
                ...state.postInteractions[postId],
                ...interaction,
              },
            },
          }),
          false,
          'updateInteraction'
        );
      },
      
      // Performance actions
      setVisibleRange: (range: [number, number]) => 
        set({ visibleRange: range }, false, 'setVisibleRange'),
      
      // Bulk initialization for performance
      initializeInteractions: (posts) => {
        const interactions: Record<string, PostInteraction> = {};
        
        posts.forEach((post) => {
          interactions[post.id] = {
            likes: post.interactions.likes,
            comments: post.interactions.comments,
            shares: post.interactions.shares,
            views: post.interactions.views,
            isLiked: false,
          };
        });
        
        set({ postInteractions: interactions }, false, 'initializeInteractions');
      },
      
      resetFeed: () => 
        set(
          {
            currentIndex: 0,
            totalPosts: 0,
            isNavigating: false,
            postInteractions: {},
            visibleRange: [0, 2],
          },
          false,
          'resetFeed'
        ),
    }),
    {
      name: 'feed-store',
    }
  )
);