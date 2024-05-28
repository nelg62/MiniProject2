"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

function AddUserForm({ onUserAdded }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [img, setImg] = useState("");
  const [phone, setPhone] = useState("");
  const defaultImg = "user.png";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addCharacterToForm = {
      first: e.target.FirstName.value,
      last: e.target.LastName.value,
      img: img || defaultImg,
      phone: e.target.Phone.value,
    };
    console.log("addCcharacter to form", addCharacterToForm);
    try {
      const response = await fetch("http://localhost:3083/users/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addCharacterToForm),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User added:", result);
        if (onUserAdded) {
          onUserAdded(result);
        }
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    setFirst("");
    setLast("");
    setImg("");
    setPhone("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3">
        <div>
          {/* <!-- First Name --> */}
          <TextField
            id="fname"
            name="FirstName"
            label="First Name:"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            required
          />

          {/* <!-- Last Name --> */}
          <TextField
            id="lname"
            name="LastName"
            label="Last Name:"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required
          />
        </div>

        {/* <!-- image Choice --> */}
        <div>
          <label htmlFor="outputimg" className="form-label fs-3">
            Image:
          </label>
          <img
            src={img || defaultImg}
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

          {/* <!-- phone number --> */}
          <div>
            <TextField
              id="phone"
              name="Phone"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* <!-- submit button --> */}
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default AddUserForm;
