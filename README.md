
# Song Message App

A web application that allows users to send messages with songs attached.

## Features

- Search for songs using the Spotify API
- Play song previews directly in the browser
- Send messages with songs attached
- View message history
- MySQL database integration for persistent storage

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Spotify API Credentials
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# MySQL Database Credentials
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=song_messages
MYSQL_PORT=3306
```

## Setup and Installation

### Frontend Setup

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

### MySQL Setup

1. Install MySQL if not already installed
2. Create the database schema using the `backend/setup.sql` file:
```
mysql -u root -p < backend/setup.sql
```

### Backend Setup

1. Navigate to the backend directory:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Start the backend server:
```
npm run dev
```

## MySQL Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE songs (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album_cover VARCHAR(255),
  uri VARCHAR(255),
  preview_url VARCHAR(255)
);

CREATE TABLE messages (
  id VARCHAR(36) PRIMARY KEY,
  recipient VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  song_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Check database connection
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get a single message by ID
- `GET /api/messages/search/:query` - Search messages by recipient
- `POST /api/messages` - Create a new message

## Error Handling

The application includes error handling for both backend and frontend:

- Backend errors are logged to the console and returned as JSON responses
- Frontend errors are displayed to the user with appropriate messages
- Fallback mechanisms are in place to use localStorage if API calls fail
