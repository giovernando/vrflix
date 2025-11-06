# VRFLIX - Movie Streaming Platform

A modern movie streaming application inspired by Netflix, built with React and TypeScript.

## Features

- Browse and discover movies
- User authentication and profiles
- Create and manage watchlists
- Movie details and trailers
- Responsive design for all devices

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **UI Library**: shadcn-ui, Tailwind CSS
- **Backend**: Supabase (Authentication, Database)
- **API**: TMDB API for movie data

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   cd flickr-box-main
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase URL and API key
   - Add your TMDB API key

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/stores/` - Zustand state management
- `src/integrations/` - External service integrations (Supabase)
- `src/lib/` - Utility functions and API clients

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
