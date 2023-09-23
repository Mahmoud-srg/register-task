import React, { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return <RegisterForm />;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData); 
      setErrors({});
    }
  };

  const validateForm = (data) => {

    const errors = {};

    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required";
    } else if (data.name.includes(" ")) {
      errors.name = "Name should not contain spaces";
    }

    if (!data.email || data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Email should be in a valid format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    } else if (data.password.length > 12) {
      errors.password = "Password should not exceed 12 characters";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!data.image) {
      errors.image = "Upload image is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    
    <div className="w-75 mx-auto py-5 fs-3">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="w-25">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div>{errors.name}</div>}
        </div>
        <br />
        <div>
          <label className="w-25">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div>{errors.email}</div>}
        </div>
        <br />
        <div>
          <label className="w-25">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div>{errors.password}</div>}
        </div>
        <br />
        <div>
          <label className="w-25">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <br />
        <div className="text-center">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            
          />
          {errors.image && <div>{errors.image}</div>}
          <br />
          
          <label className="mt-2">Upload Image:</label>
        </div>
        <br />
        <div className="text-center">
        <button
          type="submit"
          className="btn btn-lg btn-outline-primary px-5 py-3 fs-3"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};
