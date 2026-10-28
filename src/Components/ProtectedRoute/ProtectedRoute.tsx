import { Navigate } from "react-router";

function ProtectedRoute({children}:{children: React.ReactNode}) {
     if (localStorage.getItem("user_token")) {
        return children

     }
  return (
  <Navigate to="/login" />
  )
}

export default ProtectedRoute