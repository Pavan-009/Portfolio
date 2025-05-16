# DevPortfolio - Full-Stack Portfolio Web Application

A professional, fully-featured portfolio web application for showcasing development projects with both a public-facing display and a secure admin dashboard.

## Features

- **Public Project Showcase:** Responsive grid layout with filtering by category and sorting options
- **Admin Dashboard:** Secure interface for managing project data with full CRUD operations
- **Project Display:** Media galleries (images/videos), technology tags, and relevant links
- **User Authentication:** Secure login for admin access
- **API Backend:** Express.js with MongoDB for data persistence
- **Animations:** Smooth transitions and interactions using Framer Motion

## Tech Stack

### Frontend
- React 18.3
- TypeScript
- Framer Motion for animations
- React Router for navigation
- Tailwind CSS for styling
- React Hook Form for form management
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Folder Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # UI components (cards, buttons, etc.)
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── server/
│   ├── index.js          # Express server entry point
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── middleware/       # Express middleware
└── package.json          # Project dependencies and scripts
```

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory with the following variables:
     ```
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/portfolio
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```
   # Start the frontend
   npm run dev
   
   # Start the backend
   npm run server
   
   # Or start both
   npm run dev & npm run server
   ```

## Database Schema

The portfolio uses MongoDB with Mongoose. The main schema includes:

- **Project**: Contains all project data including title, description, links, media URLs, technologies, etc.
- **User**: Authentication information for admin access

## Deployment

### Frontend
- Deploy to Vercel or Netlify

### Backend
- Deploy to Railway, Render, or similar services

### Database
- MongoDB Atlas for database hosting

## Wireframe Layout

### Admin Dashboard
```
+-----------------------------------------------+
| [Header]                                      |
+-----------------------------------------------+
| Project Dashboard       [+ Add New Project]   |
|                                               |
| [Search Box]                                  |
|                                               |
| +-------------------------------------------+ |
| | Project | Date       | Priority | Actions | |
| |---------|------------|----------|---------|
| | Proj 1  | 2023-10-01 | 10       | 👁️ ✏️ 🗑️  | |
| | Proj 2  | 2023-09-15 | 8        | 👁️ ✏️ 🗑️  | |
| | Proj 3  | 2023-08-20 | 5        | 👁️ ✏️ 🗑️  | |
| +-------------------------------------------+ |
|                                               |
+-----------------------------------------------+
| [Footer]                                      |
+-----------------------------------------------+
```

### Project Display Page
```
+-----------------------------------------------+
| [Header]                                      |
+-----------------------------------------------+
| [Filter Categories]    [Sort: Dropdown]       |
|                                               |
| +--------+ +--------+ +--------+              |
| |        | |        | |        |              |
| | Proj 1 | | Proj 2 | | Proj 3 |              |
| |        | |        | |        |              |
| | [Tags] | | [Tags] | | [Tags] |              |
| |        | |        | |        |              |
| +--------+ +--------+ +--------+              |
|                                               |
| +--------+ +--------+ +--------+              |
| |        | |        | |        |              |
| | Proj 4 | | Proj 5 | | Proj 6 |              |
| |        | |        | |        |              |
| | [Tags] | | [Tags] | | [Tags] |              |
| |        | |        | |        |              |
| +--------+ +--------+ +--------+              |
|                                               |
+-----------------------------------------------+
| [Footer]                                      |
+-----------------------------------------------+
```

## Screenshots

*[Add screenshots of your application when available]*

## License

This project is licensed under the MIT License - see the LICENSE file for details.