# Tasky Wallet - Personal Finance Companion

Tasky Wallet is a React-based application designed to help users manage their personal finances easily. It features a user-friendly interface where users can add or withdraw funds, view transaction history, and track progress towards financial milestones with a gamified reward system.

## Features

### Main Components

- **Home Page**: This serves as the landing page, providing users with a brief overview of what Tasky Wallet offers and how it can help manage personal finances.
- **Sign In Page**: Handles user authentication. Users can securely sign in with their credentials, which are validated against a mock database.
- **Dashboard Page**: The central hub for managing all wallet functions. Users can add funds, withdraw funds, view their transaction history, and track gamification rewards.

### Other Components

- **Navbar**: Provides easy navigation throughout the app.
- **Loading Component**: Displays a loading spinner for a smooth user experience while data is being fetched.

### Gamification Rewards

- Users receive bonus rewards for reaching certain milestones:
  - **$100**: Reward of **$5**.
  - **$500**: Reward of **$20**.
  - **$1000**: Reward of **$50**.
- Rewards must be claimed in sequential order, ensuring users progress through all the steps.

### Toast Notifications

- Tasky Wallet uses **react-toastify** to provide instant user feedback:
  - **Successful Sign-In**: A toast notification confirms a successful login.
  - **Failed Sign-In**: Notifications are shown when incorrect username or password is entered.
  - **Bonus Rewards**: Toast notifications celebrate users' achievements when they reach milestones.

## Technologies Used

- **React**: Frontend framework for building UI components.
- **Vite**: Fast, opinionated development environment to support React with HMR (Hot Module Replacement).
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **React Toastify**: For displaying toast notifications to improve user feedback.
- **React Router**: Handles navigation between the Home, Sign In, and Dashboard pages.

## Installation and Setup Instructions

### Prerequisites

- **Node.js** and **npm** must be installed on your local machine.

### Clone the Repository

```bash
git clone https://github.com/MahmoudAlGohry/camelCaseTask.git
cd taskywallet
```

## Install Dependencies

```bash
npm install
```

## Run the Application

### To start the development server, run:

```bash
npm run dev
```
## Testing User:
### First user:
#### Username:
```bash
mahmoud12
```
#### password:
```bash
123
```
### Second user:
#### Username:
```bash
ahmed12
```
#### password:
```bash
123
```

## Project Structure

- **src/components**: Contains reusable components, including the Home, Sign In, Dashboard, NavBar, and Loading components.
- **src/data**: Includes a mock user JSON file to simulate backend data.

## Usage

- **Home Page**: Learn more about what Tasky Wallet offers.
- **Sign In**: Authenticate using the provided mock user credentials. -**Dashboard**: Manage finances, including adding or withdrawing funds, viewing transaction history, and tracking reward progress.

## Dependencies

- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^6.28.0
- **react-toastify**: ^10.0.6
- **tailwindcss**: ^3.4.15
- **vite**: ^5.4.10

## Future Improvements

- **Backend Integration**: Add a backend API for persistent data storage.
- **User Registration**: Allow users to register and manage their credentials securely.
- **Responsive Design**: Enhance mobile and tablet responsiveness.
