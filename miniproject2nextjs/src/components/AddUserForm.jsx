import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

function AddUserForm({ onUserAdded, onCancel, initialUserData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const defaultImg = "user.png";

  // Set initial user data if provided
  useEffect(() => {
    if (initialUserData) {
      setFirstName(initialUserData.firstName || "");
      setLastName(initialUserData.lastName || "");
      setImage(initialUserData.image || "");
      setPhone(initialUserData.phone || "");
    }
  }, [initialUserData]);

  // handle submit of form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      image: image || defaultImg,
      phone,
    };

    // Check if initialUserData exists, if so, edit
    if (initialUserData && initialUserData.id) {
      // Edit user
      newUser.id = initialUserData.id;
      try {
        const response = await fetch(
          `http://localhost:3083/users/api/data/${initialUserData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log("User edited:", result);
          onUserAdded(result);
        } else {
          console.error("Error editing user:", response.statusText);
        }
      } catch (error) {
        console.error("Error editing user:", error);
      }
    } else {
      // Add new user
      try {
        const response = await fetch("http://localhost:3083/users/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("User added:", result);
          onUserAdded(result);
        } else {
          console.error("Error adding user:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }

    // Clear form fields
    setFirstName("");
    setLastName("");
    setImage("");
    setPhone("");
  };

  // find the image when uploaded
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <TextField
        id="fname"
        name="FirstName"
        label="First Name:"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      {/* Last Name */}
      <TextField
        id="lname"
        name="LastName"
        label="Last Name:"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      {/* Image Choice */}
      <label htmlFor="outputimg" className="form-label fs-3">
        Image:
      </label>
      <img
        src={image || defaultImg}
        alt="Your image here"
        className="rounded mx-auto d-block border rounded-pill"
        id="outputimg"
        style={{ height: "100px", width: "100px" }}
      />
      <div>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onChange={handleImageChange}
          required
        />
      </div>

      {/* Phone Number */}
      <TextField
        id="phone"
        name="Phone"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {/* Buttons */}
      <Button variant="contained" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default AddUserForm;
