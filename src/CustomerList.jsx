import React, { useState, useEffect } from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  }, []);

  // Utility function for sorting
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...customers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setCustomers(sortedData);
  };

  // Sorting indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ▲" : " ▼";
  };

  return (
    <div>
      <h1>Customer List</h1>
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => sortData("firstname")}>First Name {getSortIndicator("firstname")}</th>
            <th onClick={() => sortData("lastname")}>Last Name {getSortIndicator("lastname")}</th>
            <th onClick={() => sortData("city")}>City {getSortIndicator("city")}</th>
            <th onClick={() => sortData("email")}>Email {getSortIndicator("email")}</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.city}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
