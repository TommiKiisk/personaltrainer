import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TrainingCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data._embedded.trainings.map((training) => ({
          title: training.activity,
          start: new Date(training.date),
          end: new Date(new Date(training.date).getTime() + training.duration * 60000),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  return (
    <div>
      <h2>Training Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
      />
    </div>
  );
};

export default TrainingCalendar;
