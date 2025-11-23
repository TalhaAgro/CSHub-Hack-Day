/**
 * Author: Talha Agro
 * this will be the connection to gemini
 */

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "./types";

//helper func to convert File object to Base64 for Gemini prompt
const fileToPart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      //Remove the "data:audio/mp3;base64," prefix
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeMusic = async (
  file: File | null,
  moods: string[],
  genres: string[],
  customMood: string,
  link: string
): Promise<AnalysisResult> => {
  try {
    //Initialize Gemini Client
    //process.env.API_KEY is handled by the env
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    //define schema
    //this enforces the return type so the frontend code doesn't crash and burn.
    const songSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        artist: { type: Type.STRING },
        year: { type: Type.STRING },
        link: { type: Type.STRING, description: "A valid YouTube or Spotify search URL" },
        reason: { type: Type.STRING, description: "A short sentence explaining why this fits the user's request." }
      },
      required: ["title", "artist", "year"],
    };

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        recognized: {
          type: Type.OBJECT,
          properties: {
             title: { type: Type.STRING },
             artist: { type: Type.STRING },
             year: { type: Type.STRING },
             link: { type: Type.STRING },
          },
          nullable: true,
          description: "The identified song if an audio file was provided. Null if no file or unrecognized."
        },
        recommendations: {
          type: Type.ARRAY,
          items: songSchema,
          description: "A list of exactly 3 to 5 recommended songs.",
        },
        message: {
           type: Type.STRING,
           description: "A short, friendly summary message about the selection."
        }
      },
      required: ["recommendations"],
    };

    const parts: any[] = [];

    //prepare inputs
    let promptText = "You are a music expert assistant. ";

    //handle audio File
    if (file) {
      const mediaPart = await fileToPart(file);
      parts.push(mediaPart);
      promptText += "First, analyze the attached audio file. Identify the song title, artist, and release year. Populating the 'recognized' field in the JSON is your priority if audio is present. ";
    } else {
      promptText += "The user has not provided an audio file to recognize. Leave the 'recognized' field null. ";
    }

    //handle recommendations logic
    promptText += "Next, please provide 3 to 5 song recommendations based on the following context:\n";
    
    const allMoods = [...moods];
    if (customMood) allMoods.push(customMood);
    
    if (allMoods.length > 0) {
      promptText += `- User Moods: ${allMoods.join(", ")}.\n`;
    }
    
    if (genres.length > 0) {
      promptText += `- User Genres: ${genres.join(", ")}.\n`;
    }

    if (link) {
        promptText += `- User Reference Link: ${link}. Use the musical style of this linked song/artist to inform recommendations.\n`;
    }

    if (file) {
        promptText += `- Also use the recognized song from the audio file (if found) to find similar sounding tracks.\n`;
    }

    promptText += "Return the result strictly as JSON matching the provided schema please";

    parts.push({ text: promptText });

    //call the API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        // Temperature 0.6 is what I went with, feel free to change in future
        temperature: 0.6, 
      },
    });

    //parse response now
    if (response.text) {
      const data = JSON.parse(response.text);
      return data as AnalysisResult;
    }

    throw new Error("No response received from Gemini.");

  } catch (error) {
    console.error("Gemini Backend Error:", error);
    throw error;
  }
};
