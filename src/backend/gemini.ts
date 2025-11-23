/**
 * Author: Talha Agro
 * this will be the connection to gemini
 */

import {GoogleGenAI, Type, Schema} from "@google/genai";
import { AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const REC_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      artist: { type: Type.STRING },
      album: { type: Type.STRING },
      year: { type: Type.STRING },
      genre: { type: Type.STRING },
      reason: { type: Type.STRING, description: "Why this song fits the criteria" },
    }
  }
};


