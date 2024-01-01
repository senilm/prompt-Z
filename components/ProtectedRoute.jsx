// components/ProtectedRoute.js
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return null;
  }

  return children;
};

export default ProtectedRoute;
