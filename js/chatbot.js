import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./firestore.js";

let genAI, model;

export async function initializeAI() {
  const apiKey = await getApiKey();
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function askChatBot(request) {
  try {
    const response = await model.generateContent(request);
    return response.response.text();
  } catch (error) {
    console.error("AI Error: Unable to process request.", error);
    return "AI Error: Unable to process request.";
  }
}
