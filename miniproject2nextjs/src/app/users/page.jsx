"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect } from "react";
import { UserDiv } from "../../../themes/makingStyles";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

// Users component
export default function Users() {
  const { currentUser } = useUserContext();
  const router = useRouter();

  // useEffect to check currentUser when it changes
  useEffect(() => {
    // If currentUser does not have an email
    if (!currentUser.email) {
      // Redirect to login page
      router.push("/login");
    }
  }, [currentUser]);

  // usersList page
  return (
    <div style={UserDiv}>
      <h1>UsersList</h1>
      {/* Display AddUserModal button */}
      <AddUserModal />
      {/* Display UserList to show users */}
      <CheckboxListSecondary />
    </div>
  );
}
