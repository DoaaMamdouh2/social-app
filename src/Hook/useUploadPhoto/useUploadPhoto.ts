import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { sendUploadPhoto } from "../../Pages/Profile/profile.api";
import { getUserData } from "../../Pages/Login/login.api";
import { UserTokenProvider } from "../../Components/AuthUserContext/AuthUserContext";

function useUploadPhoto(onDone?: () => void) {
  const queryClient = useQueryClient();
  const { setUserData } = useContext(UserTokenProvider);

  return useMutation({
    mutationFn: sendUploadPhoto,
    onSuccess: async function (response) {
      toast.success(response.message);
      const freshUser = await getUserData();
      setUserData(freshUser);
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      onDone?.();
    },
    onError: function (error) {
      toast.error(error.message);
    },
  });
}

export default useUploadPhoto;
