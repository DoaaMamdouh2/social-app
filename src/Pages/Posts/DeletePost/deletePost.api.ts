import axios from "axios";
import { axiosInterceptor } from "../../../axiosInterceptor/axiosInterceptor";
import type { DeletePostResponse } from "./deletePost.interface";

export async function sendDeletePost(postId: string): Promise<DeletePostResponse> {
  try {
    const response = await axiosInterceptor.delete<DeletePostResponse>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network error occurred. Please try again later.");
  }
}