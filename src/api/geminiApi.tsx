// ✅ src/api/GeminiAPI.ts

import axios from 'axios';
import { GEMINI_API_KEY } from '@env';

// ✅ Use v1beta Gemini 2.0 Flash
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// ✅ Health topics list (optional)
const healthTopics: string[] = [
  'rehabilitation', 'injury', 'exercise', 'workout', 'physical therapy',
  'fitness', 'health', 'stretching', 'nutrition', 'pain', 'therapy',
  'recovery', 'training', 'wellness', 'mobility', 'posture'
];

// ✅ Greeting helper
const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 18) return 'Good afternoon!';
  return 'Good evening!';
};

// ✅ Type for a chat message
export interface ChatMessage {
  text: string;
  sender: 'user' | 'model';
}

// ✅ Main Gemini request function (typed)
export const getGeminiResponse = async (messages: ChatMessage[]): Promise<string> => {
  const lastMessage = messages[messages.length - 1];
  const lower = lastMessage.text.toLowerCase().trim();

  // Basic greeting
  if (['hi', 'hello', 'hey'].includes(lower)) {
    return `Hi! ${getGreeting()}`;
  }

  // If first message → optional health check
  if (messages.length === 1) {
    const isHealthRelated = healthTopics.some(term => lower.includes(term));
    if (!isHealthRelated) {
      return "I'm here to help with health, fitness, rehab, and exercise questions. Please ask about those!";
    }
  }

  // ✅ Format for Gemini API
  const geminiMessages = messages.map(m => ({
    role: m.sender === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }));

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: geminiMessages },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    return "Sorry, something went wrong while contacting the AI.";
  }
};
