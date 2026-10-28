import { Navigate } from "react-router";

function AuthProtectedRoute({children}:{children: React.ReactNode}) {
    if(localStorage.getItem("user_token")){
        return <Navigate to="/posts" />
    }
  return (
    children
  )
}

export default AuthProtectedRoute