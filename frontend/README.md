## Installation

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```

### Frontend

The `frontend` directory contains the React application.

- `public`: Contains the public assets of the application.
- `src`: Contains the source code of the application.
  - `components`: Reusable UI components.
    - `Home`: HomePage Components
      - `Exercise`: Exercise row component to display Duration, Status, dayCheck
      - `ExercisesList`: To display the List of exercises done by user
      - `HeatMap`: Powered by ApexCharts.js to display the user exercise routine
      - `Quotes`: From API Ninjas and display the quotes randomly to motivate the user
      - `TotalDays`: To display number of days the user exercised
      - `UserExperience`: To display the User Experience with gamified experience
      - `UserRoutine`: To display the weekly routine of User like a streak 
    - `HomePage`: Displaying and rendering Home Page
    - `Login`: Displaying a Login Page
    - `SignUp`: Displaying a SignUp and edit User Page
    - `navbar`: Navbar Component
- `App.js`: The main component that sets up routes.
- `index.js`: The entry point of the React application.

# Backend Setup

## 1. Navigate to the `backend` Directory

Open your terminal and navigate to the `backend` directory:

```sh
cd backend
```

## 2. Install the Dependencies

Install the required dependencies using npm:

```sh
npm install
```

## 3. Set Up Environment Variables

1. **Create a `.env` file** by copying from the `.env.example` template:

   ```sh
   cp .env.example .env
   ```

2. **Edit the `.env` file** with your own configuration:

   ```sh
   nano .env
   ```

   Replace `mongodb://<your_mongo_db_uri>` with your actual MongoDB connection string. For example:

   ```env
   PORT=4000
   ATLAS_URI=mongodb://username:password@host:port/database
   ```

   Save and close the file.

## 4. Start the Server

- **Without live updates**:

  ```sh
  node server.js
  ```

- **With live updates using `nodemon`** (if installed):

  ```sh
  nodemon server.js
  ```

## Project Structure

The `backend` directory contains the Node.js server and Express application:

- **`models`**: Contains the Mongoose schemas.
  - `exercise.model`: Exercise Schema
  - `user.model`: User Schema 
- **`routes`**: Contains the API routes.
  - `exercises`: Backend API Routes for exercises
  - `user`: Backend API Routes for users 
- **`server.js`**: The entry point of the server application.
