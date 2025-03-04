import { GoogleGenerativeAI } from "@google/generative-ai";  // ✅ Use `import`
import dotenv from "dotenv"; // ✅ Load environment variables

dotenv.config(); // Load variables from .env

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // ✅ Get API key from environment
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({ generationConfig, history: [] });

  const result = await chatSession.sendMessage(prompt);
  console.log(await result.response.text()); // ✅ Corrected await
}

export default run; // ✅ Correct export syntax for ES modules
