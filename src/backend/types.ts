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
  reason?: string; // Explanation for why this song was picked
}

export interface AnalysisResult {
  recognized?: Song | null; // Can be null if no file uploaded
  recommendations: Song[];
  message?: string; //a friendly summary message
}

// UI Constants
export const MOODS = [
  "Sad",
  "Nostalgic",
  "Happy",
  "Energetic",
  "Chill",
  "Focus",
  "Romantic",
  "Angry",
  "Dreamy",
];
export const GENRES = [
  "Jazz",
  "Pop",
  "Rock",
  "Classical",
  "Hip-Hop/Rap",
  "Lo-fi",
  "Blues",
];
