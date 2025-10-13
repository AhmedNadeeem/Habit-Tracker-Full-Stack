import { Navigate } from "react-router-dom";

export default function ProtectedPage({ children }) {
  const user = JSON.parse(localStorage.getItem("userLocal"));

  if (!user) {
    return <Navigate to={"/auth/register"} />;
  }

  return children;
}
