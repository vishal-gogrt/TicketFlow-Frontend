# Overview

TicketFlow Frontend is a React-based web application built for a ticketing system. The application provides a modern, responsive user interface for managing tickets, user authentication, and real-time communications. It's built using React 18 with Vite as the build tool, Redux Toolkit for state management, and Tailwind CSS for styling. The application includes features for user authentication, profile management, theme switching, and real-time updates via WebSocket connections.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **React 18** with JSX for component-based UI development
- **Vite** as the build tool and development server for fast hot module replacement
- **SWC** compiler for fast refresh during development instead of Babel

## State Management
- **Redux Toolkit** for predictable state management across the application
- **Redux Persist** for persisting authentication state in localStorage
- Centralized store with separate slices for authentication and theme management
- Async thunks for handling API calls and side effects

## Styling and UI
- **Tailwind CSS v4** for utility-first styling approach
- **Lucide React** for consistent iconography
- **React Toastify** for user notifications and feedback
- Dark/light theme support with persistent theme preferences

## Routing and Navigation
- **React Router DOM v7** for client-side routing and navigation
- Protected routes based on authentication state

## Form Management
- **Formik** for form state management and validation
- **Yup** for schema-based form validation
- **React Multi Select Component** for enhanced multi-select inputs

## API Communication
- **Axios** for HTTP requests with centralized configuration
- Base URL configuration via environment variables
- Automatic token injection for authenticated requests
- Dedicated service layer for API abstraction

## Real-time Features
- **Socket.IO Client** for WebSocket connections and real-time updates
- Event-driven communication for live ticket updates

## Development Tools
- **ESLint** with React-specific rules for code quality
- Custom ESLint configuration for React hooks and refresh patterns
- TypeScript type definitions for enhanced development experience

# External Dependencies

## Backend API
- REST API backend expected at `http://localhost:3000/api/v1` (configurable via `VITE_API_URL`)
- Authentication endpoints for login and signup
- Profile management endpoints
- Token-based authentication using Bearer tokens

## Third-party Services
- **Socket.IO Server** for real-time WebSocket communications
- **Browser localStorage** for persisting authentication tokens and theme preferences

## Development Infrastructure
- **Vite Development Server** running on host `0.0.0.0` port `5000`
- **Node.js** environment with ES modules support
- **npm** package manager for dependency management

## Browser APIs
- **Local Storage API** for client-side data persistence
- **Modern browser features** supporting ES2020+ syntax and JSX