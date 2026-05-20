import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData }: any = useContext(AuthContext);
  if (localStorage.getItem("token") || userData) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
