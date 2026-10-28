import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import useUpdateComment from "../../Hook/useUpdateComment/useUpdateComment";

function EditCommentForm({ postId, commentId, currentContent, isOpen, onClose }: {
  postId: string;
  commentId: string;
  currentContent: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: { content: currentContent }
  });

  const { mutate, isPending } = useUpdateComment(postId, function () {
    onClose();
  });

  function handleUserEdit(data: { content: string }) {
    const text = data.content.trim();
    if (!text) return;
    mutate({ postId, commentId, content: text });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleUserEdit)}
        className="bg-white rounded-3xl shadow-2xl shadow-rose-200/50 p-8 w-full max-w-lg mx-4 fade-up flex flex-col gap-4"
      >
        <h2 className="text-2xl text-center text-ink">Edit Comment</h2>
        <Input {...register("content")} type="text" placeholder="Edit your comment..." className="grow" />
        <div className="flex flex-row gap-3">
          <Button
            type="submit"
            className="flex-1 bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105"
            isPending={isPending}
          >
            Save
          </Button>
          <Button
            type="button"
            className="flex-1 bg-[#B8AEB0] text-white shadow-md shadow-stone-300/40 transition-transform duration-200 hover:scale-105"
            onPress={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;