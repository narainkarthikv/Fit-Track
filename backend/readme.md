### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    node server.js
    ```
    or if `nodemon` installed for live updates of backend
    ```sh
    nodemon server.js
    ```
    
### Backend

The `backend` directory contains the Node.js server and Express application.

- `models`: Contains the Mongoose schemas.
  - `exercise.model`: Exercise Schema
  - `user.model`: User Schema 
- `routes`: Contains the API routes.
  - `exercises`: Backend API Routes for exercises
  - `user`: Backend API Routes for users 
- `server.js`: The entry point of the server application.
