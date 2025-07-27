import { Navigate, Outlet } from "react-router"; // make sure react-router-dom v6
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render nested routes/components
  return <Outlet />;
}
