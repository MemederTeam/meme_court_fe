import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PostInteraction {
    funny: number;      // likes 대신
    notFunny: number;   // comments 대신
    total: number;      // views
    userVote?: 'funny' | 'not_funny' | null;  // isLiked 대신
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
  toggleVote: (postId: string, voteType: 'funny' | 'not_funny') => void;
  incrementTotal: (postId: string) => void;
  updateInteraction: (postId: string, interaction: Partial<PostInteraction>) => void;

  // Performance actions
  setVisibleRange: (range: [number, number]) => void;

  // Bulk actions for performance
  initializeInteractions: (posts: Array<{ id: string; vote_count: any }>) => void;
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
      toggleVote: (postId: string, voteType: 'funny' | 'not_funny') => {
        const current = get().postInteractions[postId];
        const previousVote = current?.userVote;

        set(
          (state) => ({
            postInteractions: {
              ...state.postInteractions,
              [postId]: {
                ...current,
                funny: voteType === 'funny'
                  ? (previousVote === 'funny' ? current.funny - 1 : current.funny + 1)
                  : (previousVote === 'funny' ? current.funny - 1 : current.funny),
                notFunny: voteType === 'not_funny'
                  ? (previousVote === 'not_funny' ? current.notFunny - 1 : current.notFunny + 1)
                  : (previousVote === 'not_funny' ? current.notFunny - 1 : current.notFunny),
                total: current.total + (previousVote ? 0 : 1),
                userVote: previousVote === voteType ? null : voteType,
              },
            },
          }),
          false,
          'toggleVote'
        );
      },

      incrementTotal: (postId: string) => {
        const current = get().postInteractions[postId];

        set(
          (state) => ({
            postInteractions: {
              ...state.postInteractions,
              [postId]: {
                ...current,
                total: current.total + 1,
              },
            },
          }),
          false,
          'incrementTotal'
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
          // 안전하게 vote_count 접근
          const voteCount = post.vote_count || { funny: 0, not_funny: 0, total: 0 };

          interactions[post.id] = {
            funny: voteCount.funny || 0,
            notFunny: voteCount.not_funny || 0,
            total: voteCount.total || 0,
            userVote: null,
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