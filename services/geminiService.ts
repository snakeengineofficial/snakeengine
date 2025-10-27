import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

// Per guidelines, API key must be sourced directly from the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function to convert the app's message history to Gemini's required format.
const buildGeminiHistory = (messages: Message[]) => {
  return messages
    .filter(msg => msg.role === 'model' || (msg.role === 'user' && msg.text))
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
};

/**
 * Sends a message to the AI using a stateless approach.
 * A new chat session is created with the entire history for each new message.
 * This keeps the UI component as the single source of truth for the conversation history.
 */
export const sendMessageToAI = async (history: Message[], newMessage: string): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: buildGeminiHistory(history),
            config: {
                systemInstruction: "You are a helpful and friendly AI assistant named SnakeEngine AI. Keep your responses concise and conversational."
            }
        });

        const result = await chat.sendMessage({ message: newMessage });
        const response = result.text;
        return response;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "I'm having trouble connecting right now. Please try again in a moment.";
    }
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png', // Using PNG for better quality
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw new Error("I couldn't generate an image for that prompt. Please try something else.");
    }
};
