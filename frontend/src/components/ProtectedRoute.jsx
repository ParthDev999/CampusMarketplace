import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
// if token exist then page gets open 
//   Here children means the page inside ProtectedRoute.
  return children;
}

export default ProtectedRoute;