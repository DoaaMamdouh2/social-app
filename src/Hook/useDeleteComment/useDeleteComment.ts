import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendDeleteComment } from "../../Pages/Posts/Comments/comments.api";

function useDeleteComment(postId: string, onDone?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendDeleteComment,
    onSuccess: function (response) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
      queryClient.invalidateQueries({ queryKey: ["singlePost", postId] });
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      onDone?.();
    },
    onError: function (error) {
      toast.error(error.message);
    },
  });
}

export default useDeleteComment;