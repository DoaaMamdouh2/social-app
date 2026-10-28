import { useParams } from "react-router";
import Loading from "../../../Components/Loading/Loading";
import PostCard from "../PostCard/PostCard";
import Comment from "../../../Components/Comment/Comment";
import CreateCommentForm from "../../../Components/CreateCommentForm/CreateCommentForm";
import usePostDetials from "../../../Hook/usePostDetials/usePostDetials";

function PostDetials() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, commentsData } = usePostDetials(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1 className="text-5xl text-red-500">{error?.message}</h1>;
  }

  return (
    <div className="pt-20 flex flex-col items-center gap-4">
      <PostCard post={data!.data.data.post} PostDetials={true} />
      <CreateCommentForm postId={id!} />
      <div className="flex flex-col w-full max-w-4xl gap-3">
        {commentsData?.data.data.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} showActions={true} />
        ))}
      </div>
    </div>
  );
}

export default PostDetials;
