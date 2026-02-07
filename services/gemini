import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = (): Chat | null => {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Aria', an elite AI Real Estate Concierge for AMVS (Architectural Masterpieces & Visual Spaces). 
        Your tone is sophisticated, knowledgeable, and polite. 
        You assist high-net-worth clients in finding luxury properties, understanding market trends, or scheduling private viewings.
        Keep responses concise (under 100 words) unless asked for details.
        If asked about specific listings, invent plausible high-end listings that match their query (e.g., 'The Obsidian Villa in Malibu', 'Penthouse 42 in Manhattan').`,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<string>> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    // Fallback if initialization failed
    return (async function* () {
      yield "I apologize, but I am currently unable to connect to the concierge service. Please check your connection.";
    })();
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    // Create a generator that yields text chunks
    return (async function* () {
      for await (const chunk of result) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    })();

  } catch (error) {
    console.error("Error sending message to Gemini:", error);
     return (async function* () {
      yield "I encountered a slight disruption. Could you please repeat your inquiry?";
    })();
  }
};
