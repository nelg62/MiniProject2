"use client";
import Link from "next/link";
import SignUp from "@/components/LoginPage";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.email) {
      router.push("/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="Login">
      <h1>Login</h1>
      {/* LoginPage component */}
      <SignUp></SignUp>
    </div>
  );
}
