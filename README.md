# POS System Frontend

This project is the frontend application for a Point of Sale (POS) system, designed to interact with a backend API for managing orders and articles.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **React Router**: For routing within the application.
- **React Query**: For managing and caching API data.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Notistack**: For displaying notifications in the application.
- **FontAwesome Icons**: For including icons in the UI.

## Project Structure

The project is structured as follows:

- **src/components**: Contains React components used throughout the application.
- **src/context**: Includes React context for managing global state.
- **src/api**: Provides utility functions to interact with the backend API.
- **src/assets**: Holds static assets such as images used in the application.
- **src/types**: Defines TypeScript interfaces used across the application.

## Setup Instructions

1. **Clone the repository:**

2. **Install dependencies:**    `yarn install`

3. **Start the development server:** `yarn start`

4. **Open your browser:**
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Available Scripts

In the project directory, you can run:

- **npm start**: Runs the app in development mode.
- **npm test**: Launches the test runner.
- **npm run build**: Builds the app for production to the `build` folder.

## Additional Notes

- This frontend application assumes the presence of a backend API (`pos-system-backend`) accessible at `http://localhost:3000`.
- Ensure the backend API is running and properly configured before using this frontend application.
