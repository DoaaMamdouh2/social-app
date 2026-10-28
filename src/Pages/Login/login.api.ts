import axios from "axios";
import type {  LoginResponse, User } from "./login.interface";
import type { LoginFormData } from "./login.validation";


export async function sendUserLogin(userData: LoginFormData):Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_BASE_URL}/users/signin`,
      userData,
    );
    return response.data;
  } catch (error) {
    if(axios.isAxiosError<{ message: string }>(error)) {
        throw new Error(error.response?.data.message );
    }
        throw new Error("Network error occurred. Please try again later.");
  }
}
export async function getUserData():Promise<User> {
  try {
    const response = await axios.get<{ success: boolean; message: string; data: { user: User } }>(`${import.meta.env.VITE_BASE_URL}/users/profile-data`,{ // changed
      headers: {
        token: localStorage.getItem("user_token") 
      }
    }) 
    return response.data.data.user; 
  } catch (error) {
    if(axios.isAxiosError<{ message: string }>(error)) {
        throw new Error(error.response?.data.message );
    }
        throw new Error("Network Error ");
  }
}

