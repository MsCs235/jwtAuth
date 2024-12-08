# User JWT-Auth

## Overview
This project is a Node.js application that utilizes MongoDB for data storage. It includes user authentication and middleware for handling requests.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables (e.g., MongoDB connection string).

5. Start the application:
   ```bash
   npm start
   ```

## File Descriptions

### `models/User.js`
This file defines the User model using Mongoose. It includes the schema for user data, which consists of the following fields:
- `name`: A required string representing the user's name.
- `email`: A required string representing the user's email address.
- `password`: A required string for the user's password.

The model also includes timestamps for tracking creation and update times.

### `app.js`
This is the main entry point of the application. It sets up the Express server, connects to the MongoDB database, and defines the routes for handling user requests. It also includes middleware for error handling and request parsing.

### `middleware.js`
This file contains custom middleware functions that can be used throughout the application. Middleware functions can include authentication checks, logging, and error handling. They help in managing the request-response cycle effectively.
