"use client";
import Link from "next/link";
import SignUp from "@/components/LoginPage";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // check currentUser if it has changed
  useEffect(() => {
    // check if currentUser has an email
    if (currentUser.email) {
      // if currentUser has and email redirect to the dashboard page
      router.push("/dashboard");
    }
  }, [currentUser]);

  // if no email then default login is displayed
  return (
    <div className="Login">
      <h1>Login</h1>
      {/* LoginPage component */}
      <SignUp></SignUp>
    </div>
  );
}
