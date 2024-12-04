import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // Import Ag-Grid React
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme CSS

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [setGridApi] = useState(null);

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
    )
      .then((response) => response.json())
      .then((data) => {
        // Parse training data
        const trainingData = data._embedded.trainings.map((training) => ({
          ...training,
          formattedDate: new Date(training.date).toLocaleString(),
        }));
        setTrainings(trainingData);
      })
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  const handleDelete = (url) => {
    if (window.confirm("Are you sure you want to delete this training session?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setTrainings(trainings.filter((training) => training._links.self.href !== url));
            alert("Training session deleted successfully.");
          } else {
            alert("Error deleting training session.");
          }
        })
        .catch((error) => console.error("Error deleting training session:", error));
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  // Column Definitions for Ag-Grid
  const columnDefs = [
    { headerName: "Date", field: "formattedDate", sortable: true, filter: true },
    { headerName: "Duration (minutes)", field: "duration", sortable: true, filter: true },
    { headerName: "Activity", field: "activity", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <button
          onClick={() => handleDelete(params.value)}
          style={{ padding: "5px", cursor: "pointer" }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <h2>Training Sessions</h2>
      <AgGridReact
        rowData={trainings} // Row data from state
        columnDefs={columnDefs} // Column definitions
        onGridReady={onGridReady} // Grid initialization handler
        pagination={true} // Enable pagination
        paginationPageSize={10} // Set page size
        defaultColDef={{
          resizable: true,
          filter: true,
          sortable: true,
        }} // Default settings for columns
      />
    </div>
  );
};

export default TrainingList;
