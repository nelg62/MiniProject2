"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export default function Home() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // check currentUser if it has changed
  useEffect(() => {
    // if currentUser does not have an email
    if (!currentUser.email) {
      // redirect to login page
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
