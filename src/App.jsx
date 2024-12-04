import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./CustomerList";
import AddCustomer from "./AddCustomer";
import TrainingList from "./TrainingList";
import AddTraining from "./AddTraining";
import TrainingCalendar from "./TrainCalendar";


function App() {
  return (
    <Router>
      <div>
        <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
            Customer List
          </Link>
          <Link to="/add-customer" style={{ textDecoration: "none", color: "blue" }}>
            Add Customer
          </Link>
          <Link to="/trainings" style={{ textDecoration: "none", color: "blue" }}>
            Trainings
          </Link>
          <Link to="/add-training" style={{ textDecoration: "none", color: "blue" }}>
            Add Training
          </Link>
          <Link to="/calendar" style={{ textDecoration: "none", color: "blue"}}>
            Training Calendar
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/add-training" element={<AddTraining />} />
          <Route path="/calendar" element={<TrainingCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
