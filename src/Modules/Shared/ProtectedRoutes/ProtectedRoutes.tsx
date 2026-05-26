import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext2";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  if (localStorage.getItem("token") || auth?.userData) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
