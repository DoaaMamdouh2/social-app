import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { DocumentUpload } from "iconsax-reactjs";
import useUpdatePost from "../../Hook/useUpdatePost/useUpdatePost";

function EditPostForm({ postId, currentBody, isOpen, onClose }: {
  postId: string;
  currentBody?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [postImage, setPostImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const uploadFile = useRef<HTMLInputElement>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      body: currentBody ?? ""
    }
  });

  const { mutate, isPending } = useUpdatePost(postId, function () {
    setPostImage(null);
    setPreviewImage("");
    onClose();
  });

  function handleUserEdit(data: { body: string }) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (postImage) {
      formData.append("image", postImage);
    }
    mutate({ postId, formData });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(handleUserEdit)}
        className="bg-white rounded-3xl shadow-2xl shadow-rose-200/50 p-8 w-full max-w-lg mx-4 fade-up flex flex-col gap-4"
      >
        <h2 className="text-2xl text-center text-ink">Edit Post</h2>

        <div className="flex gap-3 items-center">
          <Input {...register("body")} type="text" placeholder="Edit your post..." className="grow" />
          <DocumentUpload
            size="32"
            color="#C9A0A0"
            className="cursor-pointer transition-transform hover:scale-125"
            onClick={_ => uploadFile.current?.click()}
          />
        </div>

        {previewImage && <img src={previewImage} className="w-3/4 mx-auto rounded-xl" />}

        <input
          type="file"
          hidden
          ref={uploadFile}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              setPostImage(file);
              setPreviewImage(URL.createObjectURL(file));
            }
          }}
        />

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

export default EditPostForm;