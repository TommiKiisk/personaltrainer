import React, { useState, useEffect } from "react";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data._embedded.trainings);
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

  const filteredTrainings = trainings.filter(
    (training) =>
      training.activity.toLowerCase().includes(filter.toLowerCase()) ||
      training.date.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Training Sessions</h2>

      {/* Filter/Search */}
      <input
        type="text"
        placeholder="Search by activity or date"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      {/* Trainings Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration (minutes)</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainings.map((training) => (
            <tr key={training._links.self.href}>
              <td>{new Date(training.date).toLocaleString()}</td>
              <td>{training.duration}</td>
              <td>{training.activity}</td>
              <td>
                <button
                  onClick={() => handleDelete(training._links.self.href)}
                  style={{ marginRight: "5px", padding: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingList;
