// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getProfile } from "@/services/user";
import { useRouter } from "next/router";

export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return { user };
}
