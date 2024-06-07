"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";
import { UserDiv, UserList } from "../../../themes/makingStyles";
import EnhancedTable from "@/components/UserTable";

export default function Users() {
  // users page
  return (
    <div>
      <h1>Users</h1>
      {/* display AddUserModal button and pass prop handleUserAdded  */}
      <AddUserModal />

      <EnhancedTable />
    </div>
  );
}
