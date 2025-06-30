import { ChatMessage, ChatContext } from './chatbotService';
import { OpenAI } from 'openai';

class OpenAIService {
  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    this.initializeClient();
  }

  private initializeClient() {
    if (this.apiKey) {
      try {
        this.client = new OpenAI({
          apiKey: this.apiKey,
          dangerouslyAllowBrowser: true // Note: In production, use server-side API calls
        });
      } catch (error) {
        console.error('Failed to initialize OpenAI client:', error);
        this.client = null;
      }
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.initializeClient();
  }

  async generateResponse(
    prompt: string, 
    conversationHistory: ChatMessage[],
    context: ChatContext
  ): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      // Prepare conversation history for context
      const messages = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Add system message with context
      messages.unshift({
        role: 'system',
        content: `You are a helpful healthcare assistant for Sal-lmjarab, a healthcare platform in Morocco. 
        The user's language preference is ${context.language}. 
        ${context.location ? `The user is located near: ${JSON.stringify(context.location)}` : ''}
        ${context.userProfile ? `User profile: ${JSON.stringify(context.userProfile)}` : ''}
        Provide concise, accurate information about healthcare services, doctors, and facilities.
        For emergencies, always advise calling emergency services at 15 or 141.
        You can search for doctors, hospitals, and pharmacies, and provide information about medical specialties.
        Keep responses under 150 words and focus on being helpful and accurate.`
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: prompt
      });

      // Call OpenAI API
      const completion = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages as any,
        max_tokens: 300,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error('Error generating response from OpenAI:', error);
      throw error;
    }
  }

  isAvailable(): boolean {
    return this.client !== null;
  }
}

export const openaiService = new OpenAIService();