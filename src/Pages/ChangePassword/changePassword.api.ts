import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { ChangePasswordResponse } from "./changePassword.interface";

export async function sendChangePassword(userData: { password: string, newPassword: string }): Promise<ChangePasswordResponse> {
  try {
    const response = await axiosInterceptor.patch<ChangePasswordResponse>(
      `/users/change-password`,
      userData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network error occurred. Please try again later.");
  }
}