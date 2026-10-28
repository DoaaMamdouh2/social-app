export interface UpdatePostResponse {
  success: boolean
  message: string
  data: UpdatePostData
}

export interface UpdatePostData {
  post: UpdatedPost
}

export interface UpdatedPost {
  _id: string
  body: string
  image?: string
  privacy: string
  user: string
  sharedPost: any
  likes: any[]
  createdAt: string
  likesCount: number
  isShare: boolean
  id: string
}