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
  post_count: number;
  thumbnail_images: string[];
  popularity?: number;
}

// // Single list of hot topics for main display
// export const hotTopicsData: Topic[] = [
//   {
//     id: "8a7bd28a-9c9a-4a23-8903-12fc8855ba36",
//     title: "#why?",
//     post_count: 9,
//     thumbnail_images:  [
//         "https://jahqcocrwovxdnhegztt.supabase.co/storage/v1/object/public/post-images/1764748464997_9.png",
//         "https://jahqcocrwovxdnhegztt.supabase.co/storage/v1/object/public/post-images/1764748436530_8.png",
//         "https://jahqcocrwovxdnhegztt.supabase.co/storage/v1/object/public/post-images/1764748412971_7.png"
//     ]
//   },
//   {
//     id: "ffce75d2-1ed1-4e5b-9078-1b07974c522d",
//     title: "#why",
//     post_count: 1,
//     thumbnail_images:  [
//         "https://jahqcocrwovxdnhegztt.supabase.co/storage/v1/object/public/post-images/1764747713393_1.png"
//     ]
//   },
// ];