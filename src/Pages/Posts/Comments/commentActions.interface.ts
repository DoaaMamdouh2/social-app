export interface CommentActionUser {
  _id: string
  name: string
  username: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

export interface ActionComment {
  _id: string
  content: string
  commentCreator: CommentActionUser
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  likesCount: number
  isReply: boolean
  id: string
}

export interface CommentActionResponse {
  success: boolean
  message: string
  data: { comment: ActionComment }
}

export interface DeleteCommentResponse {
  success: boolean
  message: string
  data: {}
}