export interface CommentsResponse {
  success: boolean
  message: string
  data: Data
  meta: Meta
}

export interface Data {
  comments: PostComment[]
}

export interface PostComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  repliesCount: number
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  numberOfPages: number
}