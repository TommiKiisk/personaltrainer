import React, { useState } from "react";

const AddCustomer = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          alert("Customer added successfully!");
        } else {
          alert("Failed to add customer.");
        }
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Customer</h2>
      <input name="firstname" placeholder="First Name" onChange={handleChange} required />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="streetaddress" placeholder="Street Address" onChange={handleChange} required />
      <input name="postcode" placeholder="Postcode" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddCustomer;
