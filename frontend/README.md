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
