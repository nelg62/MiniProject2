"use client";
import SimpleAlert from "@/components/Alert";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import * as React from "react";
import { useContext, useState } from "react";

// Create the UseContext
const UserContext = React.createContext();

// UserProvider component to provide context values
export const UserProvider = ({ children }) => {
  // State variables and functions
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Default image for users
  const defaultImg = "user.png";

  // Staes for users authentication
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [sumbitResult, setSubmitResult] = React.useState("");

  // Fetch users data on start from backend GET route getUsers
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3083/users/api/data");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        modalOpen,
        loading,
        defaultImg,
        currentUser,
        isEditing,
        setIsEditing,
        setUserPassword,
        setUserEmail,
        setSubmitResult,
        userEmail,
        userPassword,
        sumbitResult,
        setAlert,
        setUserToDelete,
        setDeleteModalOpen,
        userToDelete,
        setLoading,
        setModalOpen,
        setCurrentUser,
      }}
    >
      {children}
      {/* If alert is open push props to SimpleAlert  */}
      {alert.open && (
        <SimpleAlert message={alert.message} severity={alert.severity} />
      )}
      {/* If delete is cliced open DeleteConfirmation  */}
      <DeleteConfirmation open={deleteModalOpen} />
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
