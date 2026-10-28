import axios from "axios";
import { axiosInterceptor } from "../../../axiosInterceptor/axiosInterceptor";
import type { CommentActionResponse, DeleteCommentResponse } from "./commentActions.interface";

function handleError(error: unknown): never {
  if (axios.isAxiosError<{ message: string }>(error)) {
    throw new Error(error.response?.data.message);
  }
  throw new Error("Network error occurred. Please try again later.");
}

export async function sendCreateComment({ postId, content }: { postId: string, content: string }): Promise<CommentActionResponse> {
  try {
    const formData = new FormData();
    formData.append("content", content);
    const response = await axiosInterceptor.post<CommentActionResponse>(`/posts/${postId}/comments`, formData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function sendUpdateComment({ postId, commentId, content }: { postId: string, commentId: string, content: string }): Promise<CommentActionResponse> {
  try {
    const formData = new FormData();
    formData.append("content", content);
    const response = await axiosInterceptor.put<CommentActionResponse>(`/posts/${postId}/comments/${commentId}`, formData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function sendDeleteComment({ postId, commentId }: { postId: string, commentId: string }): Promise<DeleteCommentResponse> {
  try {
    const response = await axiosInterceptor.delete<DeleteCommentResponse>(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}