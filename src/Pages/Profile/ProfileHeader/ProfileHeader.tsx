import { Avatar, Card } from "@heroui/react";
import { useRef } from "react";
import { Camera } from "iconsax-reactjs";
import type { User } from "../../Login/login.interface";
import useUploadPhoto from "../../../Hook/useUploadPhoto/useUploadPhoto";

function ProfileHeader({ user }: { user: User }) {
  const uploadFile = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadPhoto(function () {
    if (uploadFile.current) uploadFile.current.value = "";
  });

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg shadow-rose-200/50 fade-up p-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <Avatar className="w-28 h-28">
            <Avatar.Image alt={user.name} src={user.photo} />
            <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
          </Avatar>
          <button
            type="button"
            disabled={isPending}
            onClick={() => uploadFile.current?.click()}
            className="absolute bottom-0 right-0 bg-main-color rounded-full p-2 shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-110 cursor-pointer disabled:opacity-50"
          >
            <Camera size="20" color="#FFFFFF" />
          </button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={uploadFile}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) mutate(file);
            }}
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl text-ink">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </Card>
  );
}

export default ProfileHeader;