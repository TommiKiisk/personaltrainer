import React, { useState, useEffect } from "react";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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

  // Sorting Logic
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...trainings].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTrainings(sortedData);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ▲" : " ▼";
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
            <th onClick={() => sortData("date")}>Date {getSortIndicator("date")}</th>
            <th onClick={() => sortData("duration")}>Duration (minutes) {getSortIndicator("duration")}</th>
            <th onClick={() => sortData("activity")}>Activity {getSortIndicator("activity")}</th>
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
