"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";
import { UserDiv, UserList } from "../../../themes/makingStyles";
import EnhancedTable from "@/components/UserTable";
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

  // usersTable page
  return (
    <div>
      <h1>UsersTable</h1>
      {/* display AddUserModal button */}
      <AddUserModal />

      {/* display UserTable component */}
      <EnhancedTable />
    </div>
  );
}
