import { useContext } from "react";
import { handleAllPosts } from "./posts.api";
import Loading from "../../Components/Loading/Loading";
import PostCard from "./PostCard/PostCard";
import CreatePost from "./CreatePost/CreatePost";
import { UserTokenProvider } from "../../Components/AuthUserContext/AuthUserContext";
import { useQuery } from "@tanstack/react-query";


 function Posts() {


const { userData } = useContext(UserTokenProvider);

const {data, isLoading, isError, error} = useQuery({
  queryKey:["allPosts"],
  queryFn: () => handleAllPosts()
})

if(isLoading){
  return <Loading/>
}

if(isError){
  return <h1 className="text-5xl text-red-500">{error.message}</h1>
}

  return ( 
<>
      { userData && <div className = "pt-20 flex flex-col gap-4 items-center">
        <CreatePost user={userData}/>
        {data && data.map(e => <PostCard key={e.id} post={e}/>)}
        
      </div>}
      
    </>
  )
}
export default Posts
