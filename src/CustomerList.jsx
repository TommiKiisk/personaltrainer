import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ExportCustomers from "./ExportCustomers";


const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error(err));
  }, []);

  const columnDefs = [
    {
      headerName: "First Name",
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <h1>Customer List</h1>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
      />
      <ExportCustomers customers={customers} />

    </div>
  );
};

export default CustomerList;
