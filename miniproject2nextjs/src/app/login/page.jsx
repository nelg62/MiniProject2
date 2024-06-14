"use client";
import SignUp from "@/components/LoginPage";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Login component
export default function Login() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // useEffect to check currentUser when it changes
  useEffect(() => {
    // Check if currentUser has an email
    if (currentUser.email) {
      // If currentUser has and email redirect to the dashboard page
      router.push("/dashboard");
    }
  }, [currentUser]);

  // If currentUser has no email display the login page
  return (
    <div className="Login">
      <h1>Login</h1>
      {/* LoginPage component */}
      <SignUp></SignUp>
    </div>
  );
}
