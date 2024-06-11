"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export default function Home() {
  const { currentUser, loading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser.email) {
      router.push("/login");
    }
  }, [currentUser, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h1>Welcome</h1>
      {currentUser.email && <p>Welcome, {currentUser.email}!</p>}
    </>
  );
}
