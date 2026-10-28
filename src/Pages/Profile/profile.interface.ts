import type { Post } from "../Posts/posts.interface";

export interface UserPostsResponse {
  success: boolean
  message: string
  data: { posts: Post[] }
  meta: {
    pagination: {
      currentPage: number
      numberOfPages: number
      limit: number
      total: number
    }
  }
}

export interface UploadPhotoResponse {
  success: boolean
  message: string
  data?: unknown
}