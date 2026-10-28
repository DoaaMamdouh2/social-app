import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendChangePassword } from "../../Pages/ChangePassword/changePassword.api";

function useChangePassword(onDone?: () => void) {
  return useMutation({
    mutationFn: sendChangePassword,
    onSuccess: function (response) {
      localStorage.setItem("user_token", response.data.token);
      toast.success(response.message);
      onDone?.();
    },
    onError: function (error) {
      toast.error(error.message);
    },
  });
}

export default useChangePassword;