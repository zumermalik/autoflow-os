import * as dotenv from 'dotenv';
import OpenAI from 'openai';

// Ensure env vars are loaded once, globally
dotenv.config();

// Export a single, reusable instance
export const llmClient = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY, 
});

// Centralize the model choice so you only have to change it in one place
export const DEFAULT_MODEL = "llama3-8b-8192";