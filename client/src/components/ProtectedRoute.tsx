
import { Route, Redirect } from "wouter";

export const ProtectedRoute = (props: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};
