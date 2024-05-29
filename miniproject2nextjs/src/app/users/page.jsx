"use client";
import CheckboxListSecondary from "@/components/UserList";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { UserStyles } from "../../../themes/makingStyles";
import AddUserModal from "@/components/AddUserModal";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // fetch data from express side and store as variable response
        const response = await fetch("http://localhost:3083/users/api/data");
        // set response to json and store in variable data
        const data = await response.json();

        // get the localstorage item users then JSON.parse covering it from a string to objects or return and empty array or nothing is there
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        // create a new map firat make a copy of the api user data with ...data.users and merge with local data ...storedusers. then map the array created from the combined arrays by using the userID and the user object for the array information. values grabs the values from the mapped object and creates a new array removing duplicates if there are any
        const combinedUsers = [
          ...new Map(
            [...data.users, ...storedUsers].map((user) => [user.id, user])
          ).values(),
        ];

        // set the list of combineduserss into state
        setUsers(combinedUsers);
        // add teh list of combined users into local storage with a key users
        localStorage.setItem("users", JSON.stringify(combinedUsers));
      } catch (error) {
        console.error("Error finding users", error);
      }
    };
    fetchUsers();
  }, []);

  // handle adding users from AddUserModal
  const handleUserAdded = (newUser) => {
    // create variable updatedUsers then copy ...users and add newusers to the array
    const updatedUsers = [...users, newUser];
    // update state of users to updatedUsers
    setUsers(updatedUsers);
    // update local storage to updated users
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="Users">
      <h1>Users</h1>
      <p>
        This Page shows Users <Link href="/">home</Link>.
      </p>
      <ThemeProvider theme={UserStyles}>
        <AddUserModal onUserAdded={handleUserAdded} />
        <CheckboxListSecondary users={users} />
      </ThemeProvider>
    </div>
  );
}
