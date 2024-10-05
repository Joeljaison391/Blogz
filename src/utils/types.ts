export interface Author {
    username: string;
  }
  
  export interface Post {
    postId?: number;
    title: string;
    content: string;
    summary: string;
    tags: [string];
    author?: Author;
    imageUrl?: string | null;
    publishAt?: string;
    status?: string;
  }
  
  export interface CreatePostResponse {
    post: Post;
    message: string;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
  }