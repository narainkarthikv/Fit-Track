# Fit-Track

Fit-Track is an exercise log-tracking application built using the MERN (MongoDB, Express, React, Node.js) stack. This documentation will guide you through the process of contributing to this project.

## Table of Contents
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
  - [Frontend](#frontend-structure)
  - [Backend](#backend-structure)
- [Contributing](#contributing)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning the Repository](#cloning-the-repository)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
- [License](#license)

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

## Project Structure

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

### Backend

The `backend` directory contains the Node.js server and Express application.

- `models`: Contains the Mongoose schemas.
  - `exercise.model`: Exercise Schema
  - `user.model`: User Schema 
- `routes`: Contains the API routes.
  - `exercises`: Backend API Routes for exercises
  - `user`: Backend API Routes for users 
- `server.js`: The entry point of the server application.

## Contributing

We welcome contributions! To contribute to Fit-Track, follow these steps:

### Forking the Repository

1. Fork the repository by clicking the "Fork" button at the top right of the repository page on GitHub.
   ![Forking the Repository](https://user-images.githubusercontent.com/github-fork-button.png)

### Cloning the Repository

2. Clone your forked repository to your local machine:
    ```sh
    git clone https://github.com/your-username/Fit-Track.git
    ```
3. Navigate to the project directory:
    ```sh
    cd Fit-Track
    ```

### Creating a Branch

4. Create a new branch for your feature or bug fix (create a branch according to the issue working on):
    ```sh
    git switch -c your-branch-name
    ```

### Making Changes

5. Make your changes to the codebase. You can edit the files using your preferred code editor.

### Committing Changes

6. Add the changes to the staging area:
    ```sh
    git add .
    ```
7. Commit the changes with a descriptive message:
    ```sh
    git commit -m "Description of your changes"
    ```

### Pushing Changes

8. Push the changes to your forked repository:
    ```sh
    git push origin your-branch-name
    ```

### Creating a Pull Request

9. Create a pull request from your forked repository to the main repository. Go to the "Pull Requests" tab on the main repository, and click "New Pull Request". Follow the instructions to create your pull request.

This is just the beginning! I look forward to making more meaningful contributions and collaborating with this amazing community. Let's build something great together and make Fit-Track the best it can be! ❤️🤝

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
