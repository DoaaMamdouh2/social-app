import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import useCreateComment from "../../Hook/useCreateComment/useCreateComment";

function CreateCommentForm({ postId }: { postId: string }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" }
  });

  const { mutate, isPending } = useCreateComment(postId, function () {
    reset();
  });

  function handleUserComment(data: { content: string }) {
    const text = data.content.trim();
    if (!text) return;
    mutate({ postId, content: text });
  }

  return (
    <form
      onSubmit={handleSubmit(handleUserComment)}
      className="w-full max-w-4xl flex flex-row gap-3 items-center bg-white rounded-3xl shadow-lg shadow-rose-200/50 p-4 fade-up"
    >
      <Input {...register("content")} type="text" placeholder="Write a comment..." className="grow focus:ring-main-color" />
      <Button
        type="submit"
        className="bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105"
        isPending={isPending}
      >
        Send
      </Button>
    </form>
  );
}

export default CreateCommentForm;