import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { UploadPhotoResponse, UserPostsResponse } from "./profile.interface";
import type { Post } from "../Posts/posts.interface";

function handleError(error: unknown): never {
  if (axios.isAxiosError<{ message: string }>(error)) {
    throw new Error(error.response?.data.message);
  }
  throw new Error("Network error occurred. Please try again later.");
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const response = await axiosInterceptor.get<UserPostsResponse>(`/users/${userId}/posts`);
    return response.data.data.posts;
  } catch (error) {
    return handleError(error);
  }
}

export async function sendUploadPhoto(file: File): Promise<UploadPhotoResponse> {
  try {
    const formData = new FormData();
    formData.append("photo", file);
    const response = await axiosInterceptor.put<UploadPhotoResponse>(`/users/upload-photo`, formData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}