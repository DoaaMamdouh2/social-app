import { Avatar, Card } from "@heroui/react";
import { useContext, useState } from "react"; 
import type { TopComment2 } from "../../Pages/Posts/posts.interface";
import { UserTokenProvider } from "../AuthUserContext/AuthUserContext"; 
import ItemMenu from "../ItemMenu/ItemMenu"; 
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"; 
import EditCommentForm from "../EditCommentForm/EditCommentForm"; 
import useDeleteComment from "../../Hook/useDeleteComment/useDeleteComment"; 

function Comment({comment, showActions}:{comment :TopComment2, showActions?: boolean}) { 
    const {_id, post, commentCreator:{name,photo, _id: ownerId},createdAt,content, image} = comment 
    const { userData } = useContext(UserTokenProvider) 
    const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false) 
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false) 
    const isOwner = userData?._id === ownerId 

    const { mutate, isPending } = useDeleteComment(post, function () { 
        setIsConfirmOpen(false) 
    }) 

  return (
    <Card className="w-full max-w-4xl bg-comment-bg shadow-md shadow-rose-200/40 fade-up"> 
          <Card.Header>
            <Card.Title className="flex gap-3 items-center mb-3 pb-3 border-rose-200 border-b"> 
                <Avatar>
            <Avatar.Image alt="John Doe" src={photo} />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <div className="grow"> 
            <h2>{name}</h2>
            <p>{new Date(createdAt).toLocaleDateString().replace(/\//g,'-')}</p>
          </div>
          {showActions && isOwner && <ItemMenu onEdit={() => setIsEditOpen(true)} onDelete={() => setIsConfirmOpen(true)} />} 
            </Card.Title>
            <Card.Description>
                {image && <img src={image} alt={content} className="w-full rounded-xl" />} 
              {content}
            </Card.Description>
          </Card.Header>

          <ConfirmDelete 
            isOpen={isConfirmOpen} 
            isPending={isPending} 
            title="Delete this comment?" 
            onConfirm={() => mutate({ postId: post, commentId: _id })} 
            onCancel={() => setIsConfirmOpen(false)} 
          /> 

          <EditCommentForm 
            key={String(isEditOpen)} 
            postId={post} 
            commentId={_id} 
            currentContent={content} 
            isOpen={isEditOpen} 
            onClose={() => setIsEditOpen(false)} 
          /> 
        </Card>
  )
}

export default Comment