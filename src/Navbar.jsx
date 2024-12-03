import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#f5f5f5" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Customers</Link>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
};

export default Navbar;
