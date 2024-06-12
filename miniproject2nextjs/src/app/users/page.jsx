"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/UserTable";
import { UserDiv } from "../../../themes/makingStyles";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Users() {
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

  // usersList page
  return (
    <div style={UserDiv}>
      <h1>UsersList</h1>
      {/* display AddUserModal button */}
      <AddUserModal />
      {/* UserList show users */}
      <CheckboxListSecondary />
    </div>
  );
}
