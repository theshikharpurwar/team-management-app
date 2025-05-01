// frontend/src/components/ViewMembersPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import { Link } from 'react-router-dom'; // For linking to detail page
import './ViewMembersPage.css'; // Import specific CSS

// Define the base URL for the backend API and uploads
const API_BASE_URL = 'http://localhost:5001/api/members'; // Adjust if needed
const UPLOADS_URL = 'http://localhost:5001/uploads/'; // Base URL for images

function ViewMembersPage() {
  // State to store the list of members
  const [members, setMembers] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState('');

  // useEffect hook to fetch members when the component mounts
  useEffect(() => {
    // Function to fetch members from the backend
    const fetchMembers = async () => {
      setLoading(true); // Start loading
      setError(''); // Clear previous errors
      try {
        // Make GET request to the backend API
        const response = await axios.get(API_BASE_URL);
        // Update the members state with the fetched data
        setMembers(response.data);
      } catch (err) {
        // Handle errors during fetching
        console.error('Error fetching members:', err);
        setError('Failed to fetch members. Please check the connection or try again later.');
        // Set members to empty array on error to avoid rendering issues
        setMembers([]);
      } finally {
        // Stop loading regardless of success or failure
        setLoading(false);
      }
    };

    fetchMembers(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once on mount

  // Render loading state
  if (loading) {
    return <div className="loading">Loading members...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Render message if no members are found
  if (members.length === 0) {
      return (
          <div className="view-members-page">
              <h2>Meet Our Amazing Team</h2>
              <p>No team members found. <Link to="/add">Add the first member!</Link></p>
          </div>
      );
  }

  // Render the list of members using cards
  return (
    <div className="view-members-page">
      <h2>Meet Our Amazing Team</h2>
      <div className="members-grid">
        {/* Map through the members array and render a card for each member */}
        {members.map((member) => (
          <div key={member._id} className="member-card">
            {/* Display member image */}
            {/* Construct the full image URL */}
            <img
              src={`${UPLOADS_URL}${member.image}`}
              alt={`${member.name}'s profile`}
              className="member-image"
              // Add a fallback image or style in case the image fails to load
              onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if fallback also fails
                  // Option 1: Use a placeholder image URL
                  // e.target.src="https://placehold.co/300x200/EFEFEF/AAAAAA?text=No+Image";
                  // Option 2: Apply a class to show a placeholder background/icon
                  e.target.classList.add('image-error');
              }}
            />
            <div className="member-info">
              {/* Display member name */}
              <h3 className="member-name">{member.name}</h3>
              {/* Display member role */}
              <p className="member-role">{member.role || 'Team Member'}</p> {/* Display role, fallback if missing */}
               {/* Display roll number if available */}
              {member.rollNumber && <p className="member-roll">Roll: {member.rollNumber}</p>}
              {/* Link to the Member Details page */}
              <Link to={`/members/${member._id}`} className="btn btn-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMembersPage;
