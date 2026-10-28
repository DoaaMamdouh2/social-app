import axios from "axios";
import { axiosInterceptor } from "../../../axiosInterceptor/axiosInterceptor";
import type { UpdatePostResponse } from "./updatePost.interface";

export async function sendUpdatePost({ postId, formData }: { postId: string, formData: FormData }): Promise<UpdatePostResponse> {
  try {
    const response = await axiosInterceptor.put<UpdatePostResponse>(`/posts/${postId}`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network error occurred. Please try again later.");
  }
}