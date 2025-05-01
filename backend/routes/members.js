// backend/routes/members.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // File system module

// Import the Member model
const Member = require('../models/Member');

// Initialize the router
const router = express.Router();

// --- Multer Configuration for File Uploads ---

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads'); // Go up one level from routes, then into uploads
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploads
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid conflicts
    // Format: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function (optional: restrict file types)
const fileFilter = (req, file, cb) => {
  // Accept only image files (jpeg, png, gif)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject file
  }
};

// Initialize multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB (optional)
  fileFilter: fileFilter // Apply the file filter
});

// --- API Routes ---

// @route   POST /api/members
// @desc    Add a new team member (with image upload)
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
  // 'image' should match the 'name' attribute of the file input field in the frontend form
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ msg: 'No image file uploaded' });
    }

    // Extract member details from the request body
    const {
        name,
        rollNumber,
        year,
        degree,
        aboutProject,
        hobbies,
        certificate,
        internship,
        aboutYourAim,
        role, // Ensure role is included in the form data or has a default
        email
    } = req.body;

     // Basic validation (can be more robust using libraries like Joi or express-validator)
     if (!name || !role) {
        // If required fields are missing, delete the uploaded file to avoid orphaned files
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ msg: 'Name and Role are required fields.' });
    }


    // Create a new member instance
    const newMember = new Member({
      name,
      rollNumber,
      year,
      degree,
      aboutProject,
      hobbies,
      certificate,
      internship,
      aboutYourAim,
      role,
      email,
      image: req.file.filename // Store the generated filename in the database
    });

    // Save the new member to the database
    const member = await newMember.save();

    // Respond with the created member data
    res.status(201).json(member);

  } catch (err) {
    console.error('Error adding member:', err.message);
    // If an error occurs after file upload, attempt to delete the uploaded file
    if (req.file && req.file.path) {
        try {
            fs.unlinkSync(req.file.path);
            console.log('Cleaned up uploaded file due to error.');
        } catch (unlinkErr) {
            console.error('Error deleting uploaded file during cleanup:', unlinkErr);
        }
    }
    // Handle specific errors like validation errors or file filter errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ msg: 'Validation Error', errors: err.errors });
    }
    if (err.message.includes('Invalid file type')) {
        return res.status(400).json({ msg: err.message });
    }
    // General server error
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/members
// @desc    Get all team members
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch all members from the database, sort by name (optional)
    const members = await Member.find().sort({ name: 1 }); // Sort alphabetically by name
    // Respond with the list of members
    res.json(members);
  } catch (err) {
    console.error('Error fetching members:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/members/:id
// @desc    Get a single team member by their ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Find the member by ID provided in the URL parameters
    const member = await Member.findById(req.params.id);

    // If member not found
    if (!member) {
      return res.status(404).json({ msg: 'Member not found' });
    }

    // Respond with the member data
    res.json(member);
  } catch (err) {
    console.error('Error fetching member by ID:', err.message);
    // Handle cases where the ID format might be invalid for MongoDB ObjectId
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Member ID format' });
    }
    res.status(500).send('Server Error');
  }
});

// Export the router to be used in server.js
module.exports = router;
