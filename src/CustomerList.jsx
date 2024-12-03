import React, { useState, useEffect } from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data._embedded.customers);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            alert("Customer deleted successfully.");
            setCustomers(customers.filter((customer) => customer._links.self.href !== url));
          } else {
            alert("Failed to delete customer.");
          }
        })
        .catch((error) => console.error("Error deleting customer:", error));
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstname.toLowerCase().includes(filter.toLowerCase()) ||
      customer.lastname.toLowerCase().includes(filter.toLowerCase())
  );

  const sortBy = (key) => {
    const sorted = [...filteredCustomers].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setCustomers(sorted);
  };

  return (
    <div>
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th onClick={() => sortBy("firstname")}>First Name</th>
            <th onClick={() => sortBy("lastname")}>Last Name</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer._links.self.href}>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.city}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => deleteCustomer(customer._links.self.href)}>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
