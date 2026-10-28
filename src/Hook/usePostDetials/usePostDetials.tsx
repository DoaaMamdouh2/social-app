import { useQuery } from "@tanstack/react-query";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { CommentsResponse } from "../../Pages/Posts/PostDetials/comments.interface";
import type { PostDetialsResponse } from "../../Pages/Posts/PostDetials/postDetials.interface";


function usePostDetials(id:string) {
    function getSinglePost() {

            return axiosInterceptor.get<PostDetialsResponse>(`/posts/${id}`)
            
        }
        const {data, isLoading, isError, error} = useQuery({
        queryKey: ["singlePost", id],
        queryFn: getSinglePost,
    })

    const {data: commentsData} = useQuery({
        queryKey: ["postComments", id],
        queryFn: getPostComments,
    })

    
        function getPostComments() {
            
            return axiosInterceptor.get<CommentsResponse>(`/posts/${id}/comments?page=1&limit=10`)
        }
  return {data, isLoading, isError, error, commentsData}
}



export default usePostDetials
