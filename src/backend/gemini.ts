/**
 * Author: Talha Agro
 * this will be the connection to gemini
 */

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "./types";
import "dotenv/config";

//helper to convert File object to Base64 for Gemini
const fileToPart = (
  file: File
): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      //remove the "data:audio/mp3;base64," prefix if exists
      const base64Data = base64String.includes(",")
        ? base64String.split(",")[1]
        : base64String;
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
  customMood: string
): Promise<AnalysisResult> => {
  try {
    //initialize Gemini Client
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    //define the Schema
    //forces Gemini to return JSON matching this structure
    const songSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        artist: { type: Type.STRING },
        year: { type: Type.STRING },
        link: {
          type: Type.STRING,
          description: "A YouTube or Spotify URL for this specific song",
        },
      },
      required: ["title", "artist", "year", "link"],
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
          description:
            "If an audio file was uploaded, this contains the identified song details. If no file or not recognized, this is null.",
        },
        recommendations: {
          type: Type.ARRAY,
          items: songSchema,
          description:
            "A list of exactly 3 to 5 recommended songs based on the user's inputs.",
        },
        message: {
          type: Type.STRING,
          description:
            "A friendly, 1-sentence summary of the vibe of these songs.",
        },
      },
      required: ["recommendations", "message"],
    };

    //prepare the Prompt
    const parts: any[] = [];
    let promptText = "You are a sophisticated musicologist. ";

    //handle audio file
    if (file) {
      const mediaPart = await fileToPart(file);
      parts.push(mediaPart);
      promptText +=
        "First, analyze the audio file provided. Identify the song title, artist, and year. Fill the 'recognized' field with this data. ";
    } else {
      promptText +=
        "No audio file provided for recognition. The 'recognized' field must be null. ";
    }

    //handle recommendations
    promptText +=
      "Next, recommend 3 to 5 songs based on the following constraints:\n";

    const allMoods = [...moods];
    if (customMood) allMoods.push(customMood);

    if (allMoods.length > 0) promptText += `- Moods: ${allMoods.join(", ")}\n`;
    if (genres.length > 0) promptText += `- Genres: ${genres.join(", ")}\n`;

    if (file) {
      promptText += `- Also consider the style/genre of the recognized audio file for the recommendations.\n`;
    }

    promptText +=
      "Ensure the recommendations are real, existing songs. Return ONLY JSON.";

    parts.push({ text: promptText });

    //call the API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5, //balanced creativity
      },
    });

    //parse response
    if (response.text) {
      //we safely parse it just in case
      return JSON.parse(response.text) as AnalysisResult;
    }

    throw new Error("Empty response from AI model");
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};
