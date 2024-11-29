# Role-Based Access Control (RBAC) System with React and Node.js

This project implements a Role-Based Access Control (RBAC) system using React for the frontend and Node.js with Express.js for the backend. The RBAC system ensures secure access to application features and data based on user roles and permissions. Since I have extensively worked on backend projects using Spring Boot, I decided to explore a project integrating Express.js and Node.js with React.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Usage Guide](#usage-guide)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [Future Enhancements](#future-enhancements)

---

## Features
- **Authentication**: Users can log in and log out securely.
- **Authorization**: Access to pages and features is controlled by roles and permissions.
- **Dynamic Routing**: Role-specific navigation based on permissions.
- **Protected Routes**: Ensures only authorized users can access specific components.
- **Admin Panel**: Admin users can manage other users and their permissions.

---

## Tech Stack
### Frontend
- **React**
- **React Router** for navigation
- **Axios** for API requests
- **JWT Decode** for handling authentication tokens

### Backend
- **Node.js**
- **Express.js**
- **Sequelize** for database interaction
- **PostgreSQL** as the database
- **JWT (JSON Web Token)** for authentication

---

## Installation and Setup

### Prerequisites
1. Node.js and npm installed
2. PostgreSQL installed and configured

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rbac-project.git
   cd rbac-project/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database:
   - Create a `.env` file with the following variables:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=rbac_db
     DB_USER=your_db_username
     DB_PASSWORD=your_db_password
     JWT_SECRET=your_secret_key
     ```
4. Run migrations and seed data:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage Guide
1. **Login**: Use the seeded credentials for initial login (e.g., `admin@example.com` / `password123`).
2. **Access Dashboard**: Available to both `USER` and `ADMIN` roles.
3. **Admin Panel**: Only accessible to `ADMIN` users.
4. **Navigate Securely**: Unauthorized attempts redirect to an error or unauthorized page.

---

## Project Structure
```
rbac-project
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── middlewares
│   ├── config
│   └── app.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│   └── public
├── README.md
└── package.json
```

---

## API Endpoints
### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Protected Routes
- `GET /dashboard` - Access user dashboard
- `GET /admin` - Admin panel

### User Management
- `GET /users` - View all users (Admin only)
- `PUT /users/:id` - Edit user roles (Admin only)

---

## Screenshots
1. **Login Page**: User authentication interface.
2. **Dashboard**: Displays user-specific content.
3. **Admin Panel**: Manage users and permissions.

---

## Future Enhancements
- Add unit and integration tests.
- Implement user role creation from the admin panel.
- Improve UI design and responsiveness.
- Extend the RBAC system to include more granular permissions.

---

## Contributions
Feel free to fork this repository, raise issues, or submit pull requests. All contributions are welcome!

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

