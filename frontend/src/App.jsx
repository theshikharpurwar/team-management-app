// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import page components
import HomePage from './components/HomePage';
import AddMemberPage from './components/AddMemberPage';
import ViewMembersPage from './components/ViewMembersPage';
import MemberDetailsPage from './components/MemberDetailsPage';

// Import CSS
import './App.css';

function App() {
  const teamName = "TEAM BLUE"; // Define team name here or fetch from config/API

  return (
    <div className="App">
      {/* Basic Navigation Header (Optional but good practice) */}
      <header className="app-header">
        <h1>{teamName} - Member Management</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Member</Link>
          <Link to="/members">View Members</Link>
        </nav>
      </header>

      {/* Main content area where routes are rendered */}
      <main className="app-main">
        <Routes>
          {/* Define routes for each page component */}
          <Route path="/" element={<HomePage teamName={teamName} />} />
          <Route path="/add" element={<AddMemberPage />} />
          <Route path="/members" element={<ViewMembersPage />} />
          {/* Route for member details, using ':id' as a URL parameter */}
          <Route path="/members/:id" element={<MemberDetailsPage />} />
           {/* Fallback route for unknown paths (optional) */}
          <Route path="*" element={<div><h2>404 Not Found</h2><Link to="/">Go Home</Link></div>} />
        </Routes>
      </main>

       {/* Basic Footer (Optional) */}
       <footer className="app-footer">
         <p>&copy; {new Date().getFullYear()} {teamName}. All rights reserved.</p>
       </footer>
    </div>
  );
}

export default App;
