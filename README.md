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


- Backend errors are logged to the console and returned as JSON responses
- Frontend errors are displayed to the user with appropriate messages
- Fallback mechanisms are in place to use localStorage if API calls fail
