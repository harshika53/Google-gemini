import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // ✅ Vite automatically loads env variables
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
  try {
    const chatSession = model.startChat({ generationConfig, history: [] });

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text(); // ✅ Corrected return statement

    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error in run function:", error);
    return "Error generating response"; // ✅ Return a fallback message
  }
}

export default run;
