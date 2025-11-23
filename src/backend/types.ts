// this is the structure of each song track that will display on the frontend
export interface Song {
    title: string;
    artist: string;
    year: string;
    link: string;
    genre: string;
}

//this is the structure of each final output after analysis that will display on the frontend
export interface AnalysisResult{
    recognised: Song;
    recommendations: Song[];
    message: string;
}

//this is just for convenience, for each credited developer
export interface DevProfile {
    name: string;
    role: string;
    imageURL: string;
    email: string;
}

//Hard coded values for the moods and genres list
export const MOODS = ['Sad', 'Nostalgic', 'Happy', 'Energetic', 'Chill', 'Focus', 'Romantic', 'Angry'];
export const GENRES = ['Jazz', 'Pop', 'Rock', 'Classical', 'Hip-Hop', 'Electronic', 'R&B', 'Country', 'Indie'];