import { Avatar, Card } from "@heroui/react";
import type { Post } from "../posts.interface";
import { Like1, MessageText1, Share } from "iconsax-reactjs";
import Comment from "../../../Components/Comment/Comment";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserTokenProvider } from "../../../Components/AuthUserContext/AuthUserContext";
import ItemMenu from "../../../Components/ItemMenu/ItemMenu";
import ConfirmDelete from "../../../Components/ConfirmDelete/ConfirmDelete";
import useDeletePost from "../../../Hook/useDeletePost/useDeletePost";
import EditPostForm from "../../../Components/EditPostForm/EditPostForm"; 

function PostCard({post,PostDetials}:{post:Post, PostDetials?:boolean}) {
    const {_id,commentsCount , createdAt, user:{name, photo, _id: ownerId},body , image, topComment}= post
    const { userData } = useContext(UserTokenProvider)
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false) 
    const navigate = useNavigate()
    const isOwner = userData?._id === ownerId

    const { mutate, isPending } = useDeletePost(function () {
        setIsConfirmOpen(false)
        if (PostDetials) {
            navigate("/posts")
        }
    })

  return (
      <Card className="w-full max-w-4xl mx-auto fade-up shadow-lg shadow-rose-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex gap-3 items-center mb-3 pb-3 border-rose-200 border-b">
            <Avatar>
        <Avatar.Image alt="John Doe" src={photo} />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
      <div className="grow">
        <h2>{name}</h2>
        <p>{new Date(createdAt).toLocaleDateString().replace(/\//g,'-')}</p>
      </div>
      {isOwner && <ItemMenu onEdit={() => setIsEditOpen(true)} onDelete={() => setIsConfirmOpen(true)} />} 
        </div>
        <div>
            {image && <img src={image} alt={body} className="w-full rounded-xl" />}
          {body}
        </div>
      </div>
      <div className="py-3 mt-3 border-t border-rose-200 flex-col mx-4 gap-4">
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
                <Like1 size="32" color="#C9A0A0" className="cursor-pointer transition-transform hover:scale-125"/>
                <Share size="32" color="#C9A0A0" className="cursor-pointer transition-transform hover:scale-125"/>
            </div>
            {!PostDetials ? (
                <Link className="flex gap-3 items-center transition-colors hover:text-main-dark" to={`/postDetials/${_id}`}>
                    {commentsCount}
                    <MessageText1 size="32" color="#C9A0A0"/>
                    Show All Comments
                </Link>
            ) : (
                <div className="flex gap-3 items-center">
                    {commentsCount}
                    <MessageText1 size="32" color="#C9A0A0"/>
                </div>
            )}
        </div>
        <div className="mx-4">
            {topComment && !PostDetials && <Comment comment={topComment} />}
        </div>
      </div>

      <ConfirmDelete
        isOpen={isConfirmOpen}
        isPending={isPending}
        title="Delete this post?"
        onConfirm={() => mutate(_id)}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <EditPostForm 
        key={String(isEditOpen)} 
        postId={_id} 
        currentBody={body} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      /> 
    </Card>
  )
}

export default PostCard