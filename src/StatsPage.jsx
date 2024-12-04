import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { groupBy, sumBy } from "lodash";

const StatsPage = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch training data
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const trainings = data._embedded.trainings;

        // Process data for the chart
        const groupedData = groupBy(trainings, "activity");
        const processedData = Object.keys(groupedData).map((activity) => ({
          activity,
          duration: sumBy(groupedData[activity], "duration"),
        }));
        setChartData(processedData);
      })
      .catch((err) => console.error("Error fetching training data:", err));
  }, []);

  return (
    <div>
      <h2>Training Statistics</h2>
      {chartData.length > 0 ? (
        <BarChart
          width={600}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" name="Duration (min)" />
        </BarChart>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StatsPage;
