import React, { useState } from "react";
import "./App.css";

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

    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData); // Display the form data in the console
      setErrors({});
    }
  };

  const validateForm = (data) => {
    // Initialize errors object
    const errors = {};

    // Validate name field
    if (!data.name || data.name.trim() === "") {
      errors.name = "Name is required";
    } else if (data.name.includes(" ")) {
      errors.name = "Name should not contain spaces";
    }

    // Validate email field
    if (!data.email || data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Email should be in a valid format";
    }

    // Validate password field
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    } else if (data.password.length > 12) {
      errors.password = "Password should not exceed 12 characters";
    }

    // Validate confirm password field
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Validate image
    if (!data.image) {
      errors.image = "Upload image is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
      </div>
      <div>
        <label>Upload Image:</label>
        <input type="file" name="image" onChange={handleChange} />
        {errors.image && <div>{errors.image}</div>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
