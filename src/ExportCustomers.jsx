import React from "react";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";

const ExportCustomers = ({ customers }) => {
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
  ];

  const data = customers.map((customer) => ({
    firstname: customer.firstname,
    lastname: customer.lastname,
    city: customer.city,
    email: customer.email,
  }));

  return (
    <div>
      <button>
        <CSVLink data={data} headers={headers} filename="customers.csv">
          Export Customers
        </CSVLink>
      </button>
    </div>
  );
};

ExportCustomers.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExportCustomers;
