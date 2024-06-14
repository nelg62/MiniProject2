"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

// Home component
export default function Home() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // useEffect to check if currentUser changes
  useEffect(() => {
    // If currentUser does not have an email
    if (!currentUser.email) {
      // Redirect to login page
      router.push("/login");
    }
  }, [currentUser]);

  // home page
  return (
    <>
      <h1>Welcome</h1>
      {currentUser.email && <p>Welcome, {currentUser.email}!</p>}
    </>
  );
}
