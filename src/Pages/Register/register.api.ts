import axios from "axios";
import type { RegisterFormData } from "./register.validation";
import type { RegisterResponse } from "./register.interface";

export async function sendUserRegister(userData: RegisterFormData) {
  try {
    const response = await axios.post<RegisterResponse>(
      `${import.meta.env.VITE_BASE_URL}/users/signup`,
      userData,
    );
    return response.data.message;
  } catch (error) {
    if(axios.isAxiosError<{ message: string }>(error)) {
        throw new Error(error.response?.data.message );
    }
        throw new Error("Network error occurred. Please try again later.");
  }
}
