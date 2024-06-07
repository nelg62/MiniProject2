"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";
import EnhancedTable from "@/components/UserTable";
import { UserDiv } from "../../../themes/makingStyles";

export default function Users() {
  // users page
  return (
    <div style={UserDiv}>
      <h1>Users</h1>
      {/* display AddUserModal button and pass prop handleUserAdded  */}
      <AddUserModal />
      {/* UserList show users pass users to display */}
      <CheckboxListSecondary />
    </div>
  );
}
