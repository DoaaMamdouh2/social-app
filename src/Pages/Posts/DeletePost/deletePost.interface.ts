export interface DeletePostResponse {
  success: boolean
  message: string
  data: DeletePostData
}

export interface DeletePostData {
  post: DeletedPost
}

export interface DeletedPost {
  _id: string
  body: string
  image: string
  privacy: string
  user: string
  sharedPost: any
  likes: any[]
  createdAt: string
  likesCount: number
  isShare: boolean
  id: string
}