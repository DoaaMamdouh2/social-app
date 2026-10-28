import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../../Pages/Profile/profile.api";

function useUserPosts(userId?: string) {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPosts(userId!),
    enabled: !!userId,
  });
}

export default useUserPosts;