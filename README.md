# WTWR (What to Wear?): Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

The **WTWR Backend API** powers the server-side functionality of the **WTWR (What to Wear?)** application. It provides secure authentication, user management, and clothing item management through a RESTful API.

This backend integrates with the WTWR React frontend and handles database operations, authorization, and data validation to ensure reliable and secure interactions between users and the application.

This project was developed as part of the **TripleTen Software Engineering Bootcamp** and expanded into a fully deployed cloud-based backend using modern Node.js technologies and production deployment practices.

---

## Live Application

**Frontend Application**

https://www.royalcloset.serverpit.com/

**Frontend Repository**

https://github.com/itsjaydenking/se_project_react

**Production API**

https://api.royalcloset.serverpit.com

---

# Project Status

The WTWR backend is **actively maintained and continuously improved** as part of ongoing development and learning.

Recent improvements focus on:

- Security and authentication
- API structure and validation
- Cloud deployment and server management
- Code organization and maintainability

---

# Features

## Authentication & Authorization

- **JWT-based authentication**
- Secure user login and registration
- Protected API routes using authentication middleware
- Password hashing with **bcrypt**

## User Management

- Retrieve the authenticated user's profile
- Update user profile information
- Secure profile updates with request validation

## Clothing Item Management

Users can:

- View all clothing items
- Add new clothing items
- Delete items they own
- Like clothing items
- Remove likes from clothing items

Ownership checks ensure users can only delete items they created.

## Data Validation

Incoming requests are validated using middleware to ensure proper data formats and prevent malformed input.

Validation includes:

- User authentication fields
- Clothing item data
- MongoDB object IDs

## Error Handling

The API implements centralized error handling to provide consistent and meaningful responses for:

- Validation errors
- Authentication failures
- Resource not found errors
- Server errors

---

# API Overview

### Authentication Routes

```
POST /signin
POST /signup
```

Authenticate existing users or create new accounts.
All routes except `/signin` and `/signup` require a valid JWT authentication token.

---

### User Routes

```
GET /users/me
PATCH /users/me
```

Retrieve or update the currently authenticated user's profile.

---

### Clothing Item Routes

```
GET /items
POST /items
DELETE /items/:id
PUT /items/:id/likes
DELETE /items/:id/likes
```

Manage clothing items and item likes.

---

# Tech Stack

## Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)

- Node.js
- Express.js
- RESTful API architecture

## Database

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

- MongoDB Atlas cloud database
- Mongoose ODM for schema modeling and data validation

## Security

- JSON Web Tokens (JWT) authentication
- bcrypt password hashing
- Protected routes middleware
- Request validation middleware

---

# Deployment Architecture

The backend is deployed on a **Google Cloud Compute Engine** virtual machine using a production-ready Node.js server configuration.

### Infrastructure

- **Google Cloud Compute Engine VM**
- **Nginx** as a reverse proxy
- **PM2** process manager for Node.js applications

### Benefits

- Reliable server uptime
- Automatic process restarts
- Reverse proxy routing for the API
- Scalable infrastructure for future growth

---

# Environment Variables

The application uses environment variables for configuration and security.

Example `.env` file:

```
PORT=3001
NODE_ENV=production
JWT_SECRET=your-secret-key
```

These values are loaded at runtime to configure the server and authentication system.

---

# Running the Project Locally

Clone the repository:

```
git clone https://github.com/itsjaydenking/se_project_express.git
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Start the production server:

```
npm run start
```

---

# Architecture Overview

The backend follows a modular Express architecture separating concerns between:

- **Routes** – Define API endpoints
- **Controllers** – Handle request logic
- **Models** – Manage database schemas
- **Middleware** – Authentication, validation, and error handling
- **Utilities** – Shared configuration and helper functions

# Project Structure

```
WTWR Backend
│
├── controllers/            # Business logic for API endpoints
│   ├── clothingItems.js
│   └── users.js
│
├── errors/                 # Custom error classes for consistent API responses
│   ├── BadRequestError.js
│   ├── ConflictError.js
│   ├── ForbiddenError.js
│   ├── NotFoundError.js
│   ├── UnauthorizedError.js
│   └── custom-errors.js
│
├── middlewares/            # Express middleware functions
│   ├── auth.js             # JWT authentication middleware
│   ├── error-handler.js    # Centralized error handling
│   ├── logger.js           # Request and error logging
│   └── validation.js       # Request validation logic
│
├── models/                 # Mongoose data models
│   ├── clothingItem.js
│   └── user.js
│
├── routes/                 # API route definitions
│   ├── clothingItems.js
│   ├── users.js
│   └── index.js            # Main router entry point
│
├── utils/                  # Utility helpers and configuration
│   ├── config.js
│   └── errors.js
│
├── postman/                # API testing collections
│
├── app.js                  # Application entry point
├── requests.log            # Logged HTTP requests
├── error.log               # Logged server errors
│
├── package.json
├── package-lock.json
├── .eslint.js
├── .editorconfig
└── .gitignore
```

The project is structured to separate concerns between routing, business logic, database models, and middleware.

---

# Development Goals

This backend project focuses on building a **secure, maintainable, and production-ready API** while reinforcing full-stack development skills.

Key learning outcomes include:

- Designing RESTful APIs
- Implementing authentication and authorization
- Managing data with MongoDB and Mongoose
- Structuring scalable Express applications
- Deploying Node.js applications to cloud infrastructure
- Integrating frontend and backend systems

---

# License

This project is licensed under the **MIT License**.

---

# Feedback

Constructive feedback and suggestions are welcome.  
If you find a bug or have ideas for improvement, feel free to open an issue or submit a pull request.
