"use client";
import AddUserModal from "@/components/AddUserModal";
import { useEffect } from "react";
import EnhancedTable from "@/components/UserTable";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

// UserTable component
export default function UsersTable() {
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

  // usersTable page
  return (
    <div>
      <h1>UsersTable</h1>
      {/* Display AddUserModal button */}
      <AddUserModal />

      {/* Display UserTable component */}
      <EnhancedTable />
    </div>
  );
}
