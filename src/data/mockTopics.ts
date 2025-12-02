export interface Card {
  id: string;
  image?: string;
  title: string;
  description?: string;
  createdAt?: string;
  author?: string;
}

export interface Topic {
  id: string;
  title: string;
  cards: Card[];
  count: number;
  popularity?: number;
  category?: string;
}

// Single list of hot topics for main display
export const hotTopicsData: Topic[] = [
  {
    id: "topic-1",
    title: "인기토픽#1",
    category: "topic-1",
    popularity: 95,
    cards: [
      { 
        id: "c1-1", 
        title: "카드 1", 
        description: "카드 설명",
        author: "user1",
        createdAt: "2024-12-02T10:00:00Z"
      },
      { 
        id: "c1-2", 
        title: "카드 2", 
        description: "카드 설명",
        author: "user2",
        createdAt: "2024-12-02T09:30:00Z"
      },
      { 
        id: "c1-3", 
        title: "카드 3", 
        description: "카드 설명",
        author: "user3",
        createdAt: "2024-12-02T08:45:00Z"
      }
    ],
    count: 25
  },
  {
    id: "topic-2",
    title: "인기토픽#2",
    category: "topic-2",
    popularity: 87,
    cards: [
      { 
        id: "c2-1", 
        title: "카드 1", 
        description: "카드 설명",
        author: "user4",
        createdAt: "2024-12-02T11:15:00Z"
      },
      { 
        id: "c2-2", 
        title: "카드 2", 
        description: "카드 설명",
        author: "user5",
        createdAt: "2024-12-02T10:30:00Z"
      },
      { 
        id: "c2-3", 
        title: "카드 3", 
        description: "카드 설명",
        author: "user6",
        createdAt: "2024-12-02T09:15:00Z"
      }
    ],
    count: 18
  },
  {
    id: "topic-3",
    title: "인기토픽#3",
    category: "topic-3",
    popularity: 92,
    cards: [
      { 
        id: "c3-1", 
        title: "카드 1", 
        description: "카드 설명",
        author: "user7",
        createdAt: "2024-12-02T12:00:00Z"
      },
      { 
        id: "c3-2", 
        title: "카드 2", 
        description: "카드 설명",
        author: "user8",
        createdAt: "2024-12-02T11:30:00Z"
      },
      { 
        id: "c3-3", 
        title: "카드 3", 
        description: "카드 설명",
        author: "user9",
        createdAt: "2024-12-02T10:45:00Z"
      }
    ],
    count: 32
  },
  {
    id: "topic-4",
    title: "인기토픽#4",
    category: "topic-4",
    popularity: 78,
    cards: [
      { 
        id: "c4-1", 
        title: "카드 1", 
        description: "카드 설명",
        author: "user10",
        createdAt: "2024-12-02T13:00:00Z"
      },
      { 
        id: "c4-2", 
        title: "카드 2", 
        description: "카드 설명",
        author: "user11",
        createdAt: "2024-12-02T12:30:00Z"
      },
      { 
        id: "c4-3", 
        title: "카드 3", 
        description: "카드 설명",
        author: "user12",
        createdAt: "2024-12-02T12:15:00Z"
      }
    ],
    count: 15
  }
];