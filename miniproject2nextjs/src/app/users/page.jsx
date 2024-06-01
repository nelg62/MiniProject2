"use client";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3083/users/api/data");

        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        console.error("Error finding users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <CheckboxListSecondary users={users} />
    </div>
  );
}
