Bus Ticket Booking System
This project is a Bus Ticket Booking System built using the MERN stack (MongoDB, Express.js, React, Node.js). The system provides a platform for users to book bus tickets, view schedules, and manage bookings efficiently. The frontend uses React with Tailwind CSS, and the backend is powered by Node.js and Express.js with MongoDB as the database.

Features
User authentication (login/register)
Bus schedule viewing
Booking management
Responsive user interface
Secure API endpoints
Project Structure
Bus-booking/
├── backend/               # Backend server code (Node.js, Express)
├── src/                   # Frontend source code (React)
├── .env                   # Environment variables (not included in repo)
├── package.json           # Dependencies and project scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite bundler configuration
├── tsconfig.json          # TypeScript configuration
└── .gitignore             # Git ignore rules
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
npm (v6 or higher) or yarn
MongoDB
Installation
Clone the repository:

git clone https://github.com/sathish-s704/bus-ticket-booking-system.git
Install dependencies:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../
npm install
Set up environment variables:

Create a .env file in the root and backend directories.
Add the following variables:
# Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Running the Project
Start the backend server:

cd backend
npm start
Start the frontend development server:

cd ../
npm run dev
Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
Scripts
npm run dev: Starts the development server.
npm start: Runs the production build.
npm run build: Builds the application for production.
Technologies Used
Frontend:
React
TypeScript
Tailwind CSS
Vite
Backend:
Node.js
Express.js
MongoDB
Deployment
Build the frontend:

npm run build
Deploy the backend to your preferred platform (Heroku, Vercel, AWS, etc.).

Serve the frontend build using a static file server or integrate it with your backend.

Contribution
Feel free to fork this repository and submit pull requests to improve the project.

Contact
For any questions or issues, please contact [sathishsathish75363@gmail.com].
