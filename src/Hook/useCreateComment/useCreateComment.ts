import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendCreateComment } from "../../Pages/Posts/Comments/comments.api";

function useCreateComment(postId: string, onDone?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendCreateComment,
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

export default useCreateComment;