import axios from "axios";
import type { AllPostsResponse, Post } from "./posts.interface";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";

export async function handleAllPosts(): Promise<Post[]> {
    try {
    //     const response = await axios.get<AllPostsResponse>(`${import.meta.env.VITE_BASE_URL}/posts`,{
    //     headers: {
    //         token: localStorage.getItem('user_token') 
    //     }
    // })
const response =await axiosInterceptor.get<AllPostsResponse>('/posts')

    return response.data.data.posts
    } catch (error) {
        if (axios.isAxiosError<{ message: string }>(error)) {
            throw new Error(error.response?.data.message);
        }
        throw new Error("Network Error ");
    }

    
}