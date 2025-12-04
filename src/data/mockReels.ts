export interface ReelPost {
    id: string;
    content: string;              // hashtagㅇㅏㄴㅣㄱㅗ ㄱㅡㄹ ㄴㅐㅇㅛㅇ
    image_url: string;
    created_at: string;
    author: {
      id: string;
      user_name: string;
      display_name: string;
      profile_image_url: string | null;
      user_profile_url: string | null;
    };
    vote_count: {
      funny: number;
      not_funny: number;
      total: number;
    };
  }
// export const mockReelsData: ReelPost[] = [
//   {
//     id: "reel-1",
//     author: {
//       username: "COBUBU",
//       handle: "@tabacobubu",
//       avatar: "/avatars/cobubu.jpg"
//     },
//     content: {
//       text: `1. 맨 위에 어떤 토픽으로 접속하거지 토픽 이름
// 2. 해당 유저 프로필 이미지 & 프로필 이미지 일에 24hr 가경 변동성 기재
// 3. 프로필 이미지 옆에 닉네임, 그 밑에 태그
// 4. 게시글 이미지 or 숏츠 동영상
// 5. 그 밑에 게시글 내용
// 6. 하단에 게시일자
// 7. 가장 밑에 버버게이션 바 형태로 댓글, 조회수 표시`,
//       image: "/images/reel1.jpg",
//       tags: ["#G2G", "#cobubu"]
//     },
//     interactions: {
//       likes: 4,
//       comments: 2,
//       shares: 2,
//       views: 146
//     },
//     timestamp: "7:26 PM - Nov 29, 2025",
//     topicId: "topic-1"
//   },
//   {
//     id: "reel-2",
//     author: {
//       username: "TechUser",
//       handle: "@techuser123",
//       avatar: "/avatars/tech.jpg"
//     },
//     content: {
//       text: "새로운 기술 트렌드에 대한 분석입니다. AI와 머신러닝이 앞으로 어떻게 발전할지 예측해보았습니다.",
//       image: "/images/reel2.jpg",
//       tags: ["#AI", "#Tech", "#Future"]
//     },
//     interactions: {
//       likes: 15,
//       comments: 8,
//       shares: 3,
//       views: 234
//     },
//     timestamp: "6:45 PM - Nov 29, 2025",
//     topicId: "topic-1"
//   },
//   {
//     id: "reel-3",
//     author: {
//       username: "FoodLover",
//       handle: "@foodie_life",
//       avatar: "/avatars/food.jpg"
//     },
//     content: {
//       text: "오늘 점심으로 먹은 파스타가 정말 맛있었어요! 레시피도 공유드릴게요.",
//       image: "/images/reel3.jpg",
//       tags: ["#Food", "#Pasta", "#Recipe"]
//     },
//     interactions: {
//       likes: 23,
//       comments: 12,
//       shares: 7,
//       views: 512
//     },
//     timestamp: "5:30 PM - Nov 29, 2025",
//     topicId: "topic-2"
//   },
//   {
//     id: "reel-4",
//     author: {
//       username: "TravelAddict",
//       handle: "@world_traveler",
//       avatar: "/avatars/travel.jpg"
//     },
//     content: {
//       text: "제주도 여행 중인데 정말 경치가 아름다워요! 다음에 또 오고 싶습니다.",
//       image: "/images/reel4.jpg",
//       tags: ["#Travel", "#Jeju", "#Nature"]
//     },
//     interactions: {
//       likes: 45,
//       comments: 18,
//       shares: 12,
//       views: 789
//     },
//     timestamp: "4:15 PM - Nov 29, 2025",
//     topicId: "topic-3"
//   },
//   {
//     id: "reel-5",
//     author: {
//       username: "GameMaster",
//       handle: "@game_pro",
//       avatar: "/avatars/game.jpg"
//     },
//     content: {
//       text: "새로 출시된 게임 리뷰입니다. 그래픽이 정말 놀라워요!",
//       image: "/images/reel5.jpg",
//       tags: ["#Gaming", "#Review", "#NewGame"]
//     },
//     interactions: {
//       likes: 67,
//       comments: 25,
//       shares: 15,
//       views: 1023
//     },
//     timestamp: "3:00 PM - Nov 29, 2025",
//     topicId: "topic-4"
//   }
// ];