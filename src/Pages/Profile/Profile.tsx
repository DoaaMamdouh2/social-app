import { useContext } from "react";
import Loading from "../../Components/Loading/Loading";
import PostCard from "../Posts/PostCard/PostCard";
import { UserTokenProvider } from "../../Components/AuthUserContext/AuthUserContext";
import useUserPosts from "../../Hook/useUserPosts/useUserPosts";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

function Profile() {
  const { userData } = useContext(UserTokenProvider);
  const { data, isLoading, isError, error } = useUserPosts(userData?._id);

  if (!userData || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1 className="text-5xl text-red-500">{error?.message}</h1>;
  }

  return (
    <div className="pt-24 flex flex-col gap-4 items-center">
      <ProfileHeader user={userData} />
      {data && data.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}
      {data && data.map((e) => <PostCard key={e.id} post={e} />)}
    </div>
  );
}

export default Profile;
