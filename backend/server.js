// backend/server.js
// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const memberRoutes = require('./routes/members');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files (uploaded images)
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected successfully'))
.catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process with failure
});

// --- API Routes ---
// Use the member routes for any requests starting with /api/members
app.use('/api/members', memberRoutes);

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Team Management API is running!');
});

// --- Start Server ---
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// --- Error Handling (Basic Example) ---
// Add a simple error handler middleware at the end
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack);
    res.status(500).send('Something broke!');
});
