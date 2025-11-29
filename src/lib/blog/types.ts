export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author: Author;
  readingTime: number;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}
