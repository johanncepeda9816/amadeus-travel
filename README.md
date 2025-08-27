# Amadeus Travel - Flight Management System

A modern web application for flight search and management built with React, TypeScript, and Material-UI. This application provides a comprehensive flight booking system with role-based access control for both regular users and administrators.

## 🚀 Features

### For All Users

- **Flight Search**: Advanced search functionality with filters for origin, destination, dates, and passenger count
- **Real-time Results**: Dynamic flight search with live data
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with Material-UI components for a sleek user experience

### For Administrators

- **Flight Management Dashboard**: Complete CRUD operations for flight data
- **Data Grid Interface**: Advanced table with sorting, filtering, and pagination
- **Flight Creation/Editing**: Modal-based forms for managing flight information
- **Role-based Access Control**: Secure admin-only areas

## 🔐 Role System

The application implements a two-tier role system:

### USER Role

- Access to public pages (Home, Flight Search)
- Can search and view flights
- View upcoming flights section
- Authentication required for personalized features

### ADMIN Role

- All USER permissions
- Access to Admin Dashboard (`/dashboard`)
- Flight management operations:
  - Create new flights
  - Edit existing flights
  - Delete flights
  - View flight analytics

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **State Management**: Zustand with persistence
- **Forms**: Formik with Yup validation
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Package Manager**: pnpm

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (NavHeader, Layout)
│   └── ui/             # Base UI components (buttons, inputs, etc.)
├── features/           # Feature-based modules
│   ├── auth/           # Authentication (login forms, schemas)
│   ├── dashboard/      # Admin dashboard functionality
│   ├── flights/        # Flight search and display
│   └── home/           # Homepage components
├── hooks/              # Custom React hooks
├── services/           # API service layers
├── stores/             # Zustand stores for state management
├── guards/             # Route protection components
├── router/             # Application routing configuration
├── lib/                # Utilities and configurations
└── types/              # TypeScript type definitions
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd amadeus-travel

# Install dependencies
pnpm install

# Set up environment variables (if needed)
cp .env.example .env.local
```

### Development

```bash
# Start development server
pnpm dev

# The application will be available at http://localhost:5173
```

### Build for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## 📜 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Prettier
- `pnpm preview` - Preview production build locally

## 🔧 API Integration

The application integrates with a RESTful API for:

### Authentication Endpoints

- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user information
- `POST /auth/refresh` - Refresh authentication token

### Flight Endpoints

- `POST /flights/search` - Search for flights
- `GET /flights/locations` - Get available locations
- `GET /flights/upcoming` - Get upcoming flights

### Admin Flight Management

- `GET /admin/flights` - Get paginated flight list
- `POST /admin/flights` - Create new flight
- `PUT /admin/flights/:id` - Update existing flight
- `DELETE /admin/flights/:id` - Delete flight

## 🎨 UI Components

### Core Components

- **BaseButton**: Customizable button with loading states
- **DateInput**: Date picker with validation
- **LocationAutocomplete**: Searchable location selector
- **LoadingSpinner**: Consistent loading indicators
- **FlightCard**: Display flight information in card format

### Layout Components

- **Layout**: Main application layout wrapper
- **NavHeader**: Navigation header with role-based menu items
- **ProtectedRoute**: Route guard for authenticated/authorized access

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and refresh mechanism
- **Role-based Access Control**: Route and feature protection based on user roles
- **Input Validation**: Comprehensive form validation using Yup schemas
- **Protected API Routes**: Authentication middleware for sensitive operations

## 🚦 Routing

The application uses React Router for navigation:

- `/` - Public homepage with flight search
- `/login` - Authentication page
- `/dashboard` - Admin-only flight management dashboard

Route protection is implemented through:

- **ProtectedRoute** component for authentication checks
- **Role validation** for admin-specific routes
- **Automatic redirects** for unauthorized access attempts

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Optimized performance on mobile devices

## 🧪 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automated code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **Lint-staged**: Staged file linting and formatting

## 🚀 Next Features

### Phase 1: User Experience Enhancement

- **Flight Booking System**: Complete booking flow with seat selection and passenger details
- **User Profiles**: Personal dashboard with booking history and preferences
- **Favorites & Watchlists**: Save and track preferred flights and routes
- **Search History**: Remember and quick-access to previous searches
- **Email Notifications**: Booking confirmations and flight updates
- **Advanced Filters**: Price range, airline preference, duration, stops, and departure time filters

### Phase 2: Business Features

- **Payment Integration**: Secure payment processing with multiple payment methods
- **Booking Management**: Modify, cancel, or view booking details
- **Check-in System**: Online check-in functionality
- **Seat Selection**: Interactive seat map for flight booking
- **Multi-passenger Booking**: Group bookings with different passenger types
- **Loyalty Program**: Points system and frequent flyer benefits

### Phase 3: Admin & Analytics

- **Admin Analytics Dashboard**: Flight performance metrics, booking statistics, and revenue reports
- **User Management**: Admin interface for managing user accounts and roles
- **Booking Analytics**: Track popular routes, peak times, and customer behavior
- **Flight Status Management**: Real-time flight status updates and delay notifications
- **Pricing Management**: Dynamic pricing tools and promotional campaigns
- **Inventory Management**: Seat availability and capacity management

### Phase 4: Advanced Features

- **Multi-language Support**: Internationalization for global users
- **Real-time Notifications**: Push notifications for flight updates and deals
- **Social Features**: Share trips and reviews with other users
- **Weather Integration**: Weather information for departure/arrival cities
- **Currency Converter**: Multi-currency support for international users

### Phase 5: AI & Automation

- **Smart Recommendations**: AI-powered flight suggestions based on user behavior
- **Price Prediction**: Machine learning for fare forecasting
- **Chatbot Support**: Automated customer service for common queries
- **Auto-rebooking**: Automatic rebooking suggestions for cancelled flights
- **Personalized Deals**: Customized offers based on user preferences and history

### Technical Improvements

- **Performance Optimization**: Code splitting, lazy loading, and caching strategies
- **Offline Support**: PWA capabilities for offline flight viewing
- **API Rate Limiting**: Enhanced security and performance for API endpoints
- **Microservices Architecture**: Scalable backend with containerized services
- **Automated Testing**: Comprehensive test suite with E2E testing
- **CI/CD Pipeline**: Automated deployment and testing workflows
