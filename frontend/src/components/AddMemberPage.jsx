// frontend/src/components/AddMemberPage.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AddMemberPage.css'; // Import specific CSS

// Define the base URL for the backend API
const API_BASE_URL = 'http://localhost:5001/api/members'; // Adjust if your backend runs elsewhere

function AddMemberPage() {
  // Hook to navigate programmatically after form submission
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: '',
    role: 'Member', // Default role, can be changed if needed
    email: '',
  });

  // State to hold the selected image file
  const [imageFile, setImageFile] = useState(null);
  // State for loading indicator during submission
  const [loading, setLoading] = useState(false);
  // State for storing success or error messages
  const [message, setMessage] = useState('');

  // Handle changes in text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle changes in the file input field
  const handleFileChange = (e) => {
    // Set the selected file to state
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage(''); // Clear previous messages
    setLoading(true); // Show loading indicator

    // --- Basic Client-Side Validation ---
    if (!formData.name || !formData.role || !imageFile) {
      setMessage('Error: Name, Role, and Image are required.');
      setLoading(false);
      return; // Stop submission if validation fails
    }

    // Create FormData object to send multipart data (text fields + file)
    const data = new FormData();
    // Append all text fields from formData state
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    // Append the image file
    data.append('image', imageFile); // 'image' must match the backend upload.single('image')

    try {
      // Send POST request to the backend API endpoint
      const response = await axios.post(API_BASE_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file uploads
        },
      });

      // Handle success
      setMessage(`Success: Member "${response.data.name}" added successfully!`);
      // Clear the form (optional)
      setFormData({ name: '', rollNumber: '', year: '', degree: '', aboutProject: '', hobbies: '', certificate: '', internship: '', aboutYourAim: '', role: 'Member', email: '' });
      setImageFile(null);
      // Optionally clear the file input visually (requires ref or controlled component)
      e.target.reset(); // Reset the form fields visually

      // Redirect to the View Members page after a short delay
      setTimeout(() => {
        navigate('/members');
      }, 1500); // Redirect after 1.5 seconds

    } catch (error) {
      // Handle errors
      console.error('Error adding member:', error);
      let errorMsg = 'Error adding member. Please try again.';
      if (error.response && error.response.data && error.response.data.msg) {
        // Use specific error message from backend if available
        errorMsg = `Error: ${error.response.data.msg}`;
      } else if (error.message) {
        errorMsg = `Error: ${error.message}`;
      }
      setMessage(errorMsg);
    } finally {
      // Hide loading indicator regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="add-member-page">
      <h2>Add New Team Member</h2>
      {/* Display messages (success or error) */}
      {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}

      {/* Form for adding a new member */}
      <form onSubmit={handleSubmit} className="add-member-form">
        {/* Input fields based on the form image in the PDF */}
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} />
        </div>
         <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} required />
        </div>
         <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="text" id="year" name="year" value={formData.year} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input type="text" id="degree" name="degree" value={formData.degree} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="aboutProject">About Project</label>
          <textarea id="aboutProject" name="aboutProject" value={formData.aboutProject} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies (comma separated)</label>
          <input type="text" id="hobbies" name="hobbies" value={formData.hobbies} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="certificate">Certificate</label>
          <input type="text" id="certificate" name="certificate" value={formData.certificate} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="internship">Internship</label>
          <input type="text" id="internship" name="internship" value={formData.internship} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="aboutYourAim">About Your Aim</label>
          <textarea id="aboutYourAim" name="aboutYourAim" value={formData.aboutYourAim} onChange={handleInputChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image *</label>
          {/* File input for image upload */}
          <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" required />
          {/* Display selected file name (optional) */}
          {imageFile && <span className="file-name">Selected: {imageFile.name}</span>}
        </div>

        {/* Submit button - disabled while loading */}
        <button type="submit" className="btn btn-submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default AddMemberPage;

