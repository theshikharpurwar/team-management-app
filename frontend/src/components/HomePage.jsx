// frontend/src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css'; // Import specific CSS for HomePage

function HomePage({ teamName }) {
  return (
    <div className="home-page">
      <div className="home-content">
        {/* Display the team name passed as a prop */}
        <h2>{teamName}</h2>
        {/* Welcome message */}
        <p>Welcome to the {teamName} Team Management Application</p>

        {/* Container for navigation buttons */}
        <div className="manage-team-box">
          <h3>Manage Team</h3>
          <div className="button-group">
            {/* Link to the Add Member page */}
            <Link to="/add" className="btn btn-primary">
              Add Member
            </Link>
            {/* Link to the View Members page */}
            <Link to="/members" className="btn btn-secondary">
              View Members
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
