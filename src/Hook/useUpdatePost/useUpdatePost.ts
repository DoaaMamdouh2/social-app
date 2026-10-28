import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendUpdatePost } from "../../Pages/Posts/UpdatePost/updatePost.api";

function useUpdatePost(postId: string, onDone?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendUpdatePost,
    onSuccess: function (response) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({ queryKey: ["singlePost", postId] });
      onDone?.();
    },
    onError: function (error) {
      toast.error(error.message);
    },
  });
}

export default useUpdatePost;