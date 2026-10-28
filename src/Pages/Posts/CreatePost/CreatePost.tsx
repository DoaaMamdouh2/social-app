import { Avatar, Button, Card, Form, Input, toast } from "@heroui/react";
import type { User } from "../../Login/login.interface";
import { DocumentUpload } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { createUserPost } from "./createPost.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePost({ user }: { user: User }) {
  const { photo, name } = user;

  const [postImage, setPostImage] = useState<string | File>("");
  const [uploadUserImage, setUploadUserImage] = useState<string>("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  const queryClient = useQueryClient();
  function handleUserPost(data: { body: string }) {
    const text = data.body.trim();
    if (!text && !postImage) return;
    const formData = new FormData();
    if (text) {
      formData.append("body", text);
    }
    if (postImage) {
      formData.append("image", postImage);
    }
    toast.promise(mutateAsync(formData), {
      loading: "Post Creating...",
      success: function (message) {
        reset();
        setUploadUserImage("");
        setPostImage("");
        if (uploadFile.current) uploadFile.current.value = "";
        return <h1 className="text-green-300">{message}</h1>;
      },
      error: undefined,
    });
  }

  const uploadFile = useRef<HTMLInputElement>(null);

  const { mutateAsync } = useMutation({
    mutationFn: createUserPost,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ["allPosts"],
      });
    },
  });

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg shadow-rose-200/50 fade-up">
      <div>
        <div className="flex gap-3 items-center mb-3 pb-3 border-rose-200 border-b">
          <h2 className="text-ink">What's on your mind, {name}?</h2>
        </div>
        <div>
          <Form onSubmit={handleSubmit(handleUserPost)}>
            <div className="flex gap-3 items-center mb-3 pb-3 border-rose-200 border-b">
              <Avatar>
                <Avatar.Image alt="John Doe" src={photo} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Input
                {...register("body")}
                type="text"
                placeholder="Create a post..."
                className="grow focus:ring-main-color"
              />
              <DocumentUpload
                size="32"
                color="#C9A0A0"
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={(_) => uploadFile.current?.click()}
              />
            </div>

            {uploadUserImage && (
              <>
                <img
                  src={uploadUserImage}
                  className="w-3/4 max-h-64 object-contain mx-auto rounded-xl shadow-md shadow-rose-200/50"
                />
                <button
                  type="button"
                  className="text-sm text-main-dark underline mx-auto transition-colors hover:text-ink cursor-pointer"
                  onClick={() => {
                    setPostImage("");
                    setUploadUserImage("");
                    if (uploadFile.current) uploadFile.current.value = "";
                  }}
                >
                  Remove image
                </button>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              Create Post
            </Button>
          </Form>
          <input
            type="file"
            hidden
            ref={uploadFile}
            onChange={(e) => {
              setPostImage(e.target.files![0]);
              setUploadUserImage(URL.createObjectURL(e.target.files![0]));
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default CreatePost;
