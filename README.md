# Student Team Members Management Application (Team: [Your Team Name])

This is a full-stack web application for managing team members, built for the 21CSS301T Full Stack Development course (CLAT-2).

## Technologies Used

* **Frontend**: React.js (Vite/CRA), React Router, Axios, CSS
* **Backend**: Node.js, Express.js, MongoDB (Mongoose), Multer (for file uploads), CORS, Dotenv
* **Database**: MongoDB (Local or Atlas)

## Features

* View all team members on the homepage.
* Add new team members with details and a profile image.
* View detailed information for each team member.
* Responsive design (basic).

## Project Structure


/
├── backend/      # Node.js/Express API
│   ├── models/
│   ├── routes/
│   ├── uploads/  # Stored images (served statically)
│   ├── .env      # Environment variables (DB URI, Port) - DO NOT COMMIT
│   ├── .gitignore
│   └── server.js # Main backend entry point
├── frontend/     # React Application
│   ├── public/
│   ├── src/
│   │   ├── components/ # React page components
│   │   ├── App.css     # Global styles
│   │   ├── App.jsx     # Main App component with routing
│   │   └── main.jsx    # Frontend entry point
│   ├── .gitignore
│   └── index.html  # Main HTML file
└── README.md     # This file


## API Endpoints

* `POST /api/members`: Add a new member (expects multipart/form-data with member details and an 'image' file).
* `GET /api/members`: Retrieve a list of all members.
* `GET /api/members/:id`: Retrieve details for a specific member by their ID.
* `/uploads/:filename`: Access uploaded images statically.

## Setup and Installation

1.  **Prerequisites**:
    * Node.js (v16 or later recommended)
    * npm or yarn
    * MongoDB (running locally or an Atlas cluster URI)
    * Git

2.  **Clone Repository**:
    ```bash
    git clone [Your GitHub Repository URL]
    cd [your-team-name-repo]
    ```

3.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Create a .env file in the backend/ folder
    # Add your MONGO_URI and PORT (e.g., PORT=5001) to the .env file
    # Example .env:
    # MONGO_URI=mongodb://localhost:27017/teamMembersDB
    # PORT=5001
    cd ..
    ```

4.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

## How to Run the Application

1.  **Start MongoDB**: Ensure your MongoDB instance is running.
2.  **Start Backend Server**:
    ```bash
    cd backend
    npm start # Or: node server.js / nodemon server.js
    ```
    *(The backend should be running on the port specified in .env, e.g., http://localhost:5001)*
3.  **Start Frontend Development Server**:
    *Open a new terminal*
    ```bash
    cd frontend
    npm run dev # (for Vite) or npm start (for CRA)
    ```
    *(The frontend should open in your browser, e.g., http://localhost:5173 or http://localhost:3000)*

## Notes

* Ensure the `uploads` directory exists in the `backend` folder for image storage.
* Update the API base URL (`API_BASE_URL`) and image URL (`UPLOADS_URL`) in the frontend components if your backend runs on a different port or domain.
