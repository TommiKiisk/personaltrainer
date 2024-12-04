import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const AddTraining = () => {
  const [formData, setFormData] = useState({
    date: null, // Changed to Date object for DatePicker
    activity: "",
    duration: "",
    customer: "",
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers to populate the dropdown
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      date: formData.date.toISOString(), // Convert Date object to ISO string
    };

    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Training session added successfully!");
          setFormData({
            date: null,
            activity: "",
            duration: "",
            customer: "",
          });
        } else {
          alert("Failed to add training session.");
        }
      })
      .catch((error) => console.error("Error adding training session:", error));
  };

  return (
    <div>
      <h2>Add Training</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {/* Date Input */}
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select Date and Time"
          required
          style={{ padding: "10px" }}
        />

        {/* Activity Input */}
        <input
          name="activity"
          placeholder="Activity"
          value={formData.activity}
          onChange={handleChange}
          required
        />

        {/* Duration Input */}
        <input
          name="duration"
          type="number"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        {/* Customer Dropdown */}
        <select
          name="customer"
          value={formData.customer}
          onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._links.self.href} value={customer._links.self.href}>
              {customer.firstname} {customer.lastname}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit" style={{ padding: "10px" }}>
          Add Training
        </button>
      </form>
    </div>
  );
};

export default AddTraining;
