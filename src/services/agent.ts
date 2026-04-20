import OpenAI from "openai";
import { Action } from "../types";
import * as dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

// ============================================================================
// LLM CLIENT CONFIGURATION
// Switch between providers by uncommenting the desired block.
// ENSURE NO API KEYS ARE HARDCODED BEFORE COMMITTING TO VERSION CONTROL.
// ============================================================================

// --- GROQ CONFIGURATION (Active) ---
const openai = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  // Relies entirely on the .env file.
  apiKey: process.env.GROQ_API_KEY, 
});
const CURRENT_MODEL = "llama3-70b-8192";

// --- OPENAI CONFIGURATION (Commented out) ---
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, 
// });
// const CHOOSEN_MODEL = "gpt-4o-mini";

// ============================================================================

/**
 * Converts a natural language instruction into a sequence of browser automation steps.
 * * @param input - The natural language instruction from the user.
 * @returns A promise that resolves to an array of executable Actions.
 */
export async function generateSteps(input: string): Promise<Action[]> {
  const systemPrompt = `
Convert the following instruction into a strictly formatted JSON array of steps for browser automation.

Allowed actions:
- goto(url)
- click(selector)
- type(selector, text)
- extract(selector)

Respond ONLY with the raw JSON array. Do not include markdown formatting, backticks, or explanations.
`;

  try {
    const response = await openai.chat.completions.create({
      model: CURRENT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Instruction: "${input}"` }
      ],
      temperature: 0.1, // Optimized for deterministic, structured output
    });

    const rawOutput = response.choices[0]?.message?.content || "[]";
    
    // Sanitize output to handle edge cases where the LLM injects markdown
    const sanitizedOutput = rawOutput
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(sanitizedOutput);
  } catch (error) {
    console.error("[Agent Error] Failed to generate or parse automation steps:", error);
    // Return an empty array to fail gracefully and prevent downstream crashes
    return [];
  }
}