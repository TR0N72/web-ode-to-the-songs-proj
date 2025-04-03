
// Spotify token management and API calls
import { toast } from "@/hooks/use-toast";
import { SpotifySearchResult } from "@/types";

// Constants
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_KEY = "spotify_token";

export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

/**
 * Check if we have a valid token
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token && token.expires_at > Date.now();
};

/**
 * Get the stored token
 */
export const getToken = (): SpotifyToken | null => {
  const tokenStr = localStorage.getItem(TOKEN_KEY);
  if (!tokenStr) return null;
  
  try {
    return JSON.parse(tokenStr);
  } catch (error) {
    return null;
  }
};

/**
 * Save the token to localStorage
 */
export const saveToken = (token: SpotifyToken): void => {
  // Add expiration time
  token.expires_at = Date.now() + token.expires_in * 1000;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

/**
 * Clear the token from localStorage
 */
export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get client credentials token from Spotify
 */
export const getClientCredentialsToken = async (): Promise<boolean> => {
  try {
    // This would normally be done on a server to protect your client secret
    // For demo purposes only - in production move this to a backend service
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Base64 encode the client ID and secret
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    saveToken({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
      expires_at: 0 // Will be set in saveToken
    });
    
    return true;
  } catch (error) {
    console.error('Error getting client credentials token:', error);
    return false;
  }
};

/**
 * Search for tracks on Spotify
 */
export const searchTracks = async (query: string): Promise<SpotifySearchResult[]> => {
  if (!query) return [];
  
  // Check if we have a valid token, if not, get a new one
  if (!isAuthenticated()) {
    const success = await getClientCredentialsToken();
    if (!success) {
      toast({
        title: "Couldn't connect to Spotify",
        description: "There was an error connecting to Spotify",
        variant: "destructive"
      });
      return [];
    }
  }
  
  const token = getToken();
  if (!token) {
    return [];
  }
  
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`
        }
      }
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired
        clearToken();
        // Try again with a new token
        const success = await getClientCredentialsToken();
        if (success) {
          return searchTracks(query); // Retry the search
        }
        return [];
      }
      throw new Error('Failed to search Spotify');
    }
    
    const data = await response.json();
    
    // Transform the response into our app's format
    return data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(', '),
      albumCover: track.album.images[0]?.url,
      uri: track.uri
    }));
  } catch (error) {
    console.error('Error searching Spotify:', error);
    toast({
      title: "Error searching songs",
      description: "There was an error searching Spotify",
      variant: "destructive"
    });
    return [];
  }
};

/**
 * Open the song in Spotify
 */
export const playSong = (uri: string): void => {
  window.open(`https://open.spotify.com/track/${uri.split(':')[2]}`, '_blank');
};

// Since we're not using auth flow anymore, this function is simplified
export const handleCallback = (): boolean => {
  return true; // Always return true as we're not using this flow
};

