"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

function AddUserForm({ onUserAdded }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [img, setImg] = useState("");
  const [phone, setPhone] = useState("");
  const defaultImg = "user.png";

  // handle submit of form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // set key and values from vales of data from form and set to new object newUser
    const newUser = {
      firstName: first,
      lastName: last,
      image: img || defaultImg,
      phone: phone,
    };
    console.log("addCcharacter to form", newUser);
    try {
      // set variable response for express server to post data to server
      const response = await fetch("http://localhost:3083/users/api/data", {
        // method for posting post
        method: "POST",
        // headers so server can understand what is being sent
        headers: {
          "Content-Type": "application/json",
        },
        // actial content being sent stringifyed vwertion of newUser object
        body: JSON.stringify(newUser),
      });

      // check to make sure data was receieved ok otherwise fail / error
      if (response.ok) {
        // get response in json format and store in variable result
        const result = await response.json();
        console.log("User added:", result);
        // if onUserAdded exists pust results through to AddUserModal then exentually to users/page which is handleUserAdded and will push user to express server users array
        if (onUserAdded) {
          onUserAdded(result);
        }
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }

    // clear states for form
    setFirst("");
    setLast("");
    setImg("");
    setPhone("");
  };

  // find the image when uploaded
  const handleImageChange = (e) => {
    // create variable file and add the value of the first file to it
    const file = e.target.files[0];

    // create a variable reader for a new FileReader() this is used to read files so people can upload files from any location on there computer
    const reader = new FileReader();

    // read the file path and set the result to the state of setImg
    reader.onloadend = () => {
      setImg(reader.result);
    };

    // if the file exists then convert the path of the file to a url
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
