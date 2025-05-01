// backend/models/Member.js
// Import mongoose
const mongoose = require('mongoose');

// Define the schema for a team member
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'], // Name is required
    trim: true, // Remove whitespace from both ends
  },
  rollNumber: {
    type: String,
    required: false, // Optional field as per form image
    trim: true,
  },
  year: {
    type: String, // e.g., 'III', 'IV'
    required: false,
    trim: true,
  },
  degree: {
    type: String, // e.g., 'B.Tech CSE'
    required: false,
    trim: true,
  },
  aboutProject: {
    type: String,
    required: false,
    trim: true,
  },
  hobbies: {
    type: String, // Storing as comma-separated string as per form
    required: false,
    trim: true,
  },
  certificate: {
    type: String,
    required: false,
    trim: true,
  },
  internship: {
    type: String,
    required: false,
    trim: true,
  },
  aboutYourAim: {
    type: String,
    required: false,
    trim: true,
  },
  // Store the filename of the uploaded image
  image: {
    type: String,
    required: [true, 'Member image is required'], // Image is required
  },
  // Add timestamps for creation and updates
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Add a field for the role, as mentioned in requirements but not explicitly in form image
  role: {
    type: String,
    required: [true, 'Member role is required'],
    trim: true,
    default: 'Member' // Default role if not provided
  },
  // Add email/contact info as mentioned in requirements
  email: {
      type: String,
      required: false, // Making optional as not explicitly in form image, but good practice
      trim: true,
      lowercase: true,
      // Basic email validation (can be enhanced)
      match: [/\S+@\S+\.\S+/, 'is invalid']
  }
});

// Update the 'updatedAt' field before saving
MemberSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Member model based on the schema
// The first argument 'Member' is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name (e.g., 'members')
module.exports = mongoose.model('Member', MemberSchema);
