/**
 * Author: Talha Agro
 * this is the structure of each song track that will display on the frontend
 */

export interface Song {
  title: string;
  artist: string;
  year: string;
  link?: string;
  genre?: string;
  reason?: string; // Added reason so the AI can explain why it recommended this
}

export interface AnalysisResult {
  recognized?: Song;
  recommendations: Song[];
  message?: string;
}

export interface DevProfile {
  name: string;
  role: string;
  imageUrl: string;
}

// These constants drive the UI checkboxes.
// As the backend dev, you control the available categories here.
export const MOODS = ['Sad', 'Nostalgic', 'Happy', 'Energetic', 'Chill', 'Focus', 'Romantic', 'Angry'];
export const GENRES = ['Jazz', 'Pop', 'Rock', 'Classical', 'Hip-Hop', 'Electronic', 'R&B', 'Country', 'Indie'];
