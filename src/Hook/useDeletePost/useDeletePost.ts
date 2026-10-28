import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendDeletePost } from "../../Pages/Posts/DeletePost/deletePost.api";

function useDeletePost(onDone?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendDeletePost,
    onSuccess: function (response) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      onDone?.();
    },
    onError: function (error) {
      toast.error(error.message);
    },
  });
}

export default useDeletePost;