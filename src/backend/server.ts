import http from "http";
import fs from "fs";
import path from "path";
import { analyzeMusic } from "./gemini";
import { AnalysisResult } from "./types";

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    const contentType = req.headers["content-type"];

    if (!contentType || !contentType.startsWith("multipart/form-data")) {
      res.writeHead(400);
      res.end("Expected multipart/form-data");
      return;
    }

    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      res.writeHead(400);
      res.end("Missing boundary");
      return;
    }

    // Read entire body
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const bodyString = body.toString("binary");

    // Split the request by boundary
    const parts = bodyString.split(`--${boundary}`).filter((p) => p.trim());

    let file: File | null = null;
    const moods: string[] = [];
    const genres: string[] = [];
    let customMood = "";

    for (const part of parts) {
      if (!part.includes("Content-Disposition")) continue;

      // Extract field name
      const nameMatch = /name="(.+?)"/.exec(part);
      if (!nameMatch) continue;

      const fieldName = nameMatch[1];

      // Check if it's a file
      if (part.includes("filename=")) {
        // -------- FILE PART --------

        const filenameMatch = /filename="(.+?)"/.exec(part);
        const filename = filenameMatch ? filenameMatch[1] : "uploaded_file";

        const typeMatch = /Content-Type: (.+?)\r\n/.exec(part);
        const mimeType = typeMatch ? typeMatch[1] : "application/octet-stream";

        const start = part.indexOf("\r\n\r\n") + 4;
        let fileData = part.substring(start);
        fileData = fileData.replace(/\r\n$/, "");

        const buffer = Buffer.from(fileData, "binary");

        // Use Node's built-in File class
        file = new File([buffer], filename, { type: mimeType });
      } else {
        // -------- TEXT FIELD PART --------

        const start = part.indexOf("\r\n\r\n") + 4;
        let value = part.substring(start).replace(/\r\n$/, "");

        if (fieldName === "moods") {
          moods.push(value);
        } else if (fieldName === "genres") {
          genres.push(value);
        } else if (fieldName === "customMood") {
          customMood = value;
        }
      }
    }

    // Call your async analysis function
    const result: AnalysisResult = await analyzeMusic(
      file,
      moods,
      genres,
      customMood
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
