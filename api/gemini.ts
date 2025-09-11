import type { Handler, HandlerEvent } from '@netlify/functions';
import { GoogleGenAI, Content } from '@google/genai';

// Netlify serverless function
const handler: Handler = async (event: HandlerEvent) => {
    // POST requests only
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Allow': 'POST' },
            body: 'Method Not Allowed',
        };
    }

    try {
        const { history } = JSON.parse(event.body || '{}');
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ details: 'API key not configured' }),
            };
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const formattedHistory: Content[] = history.slice(1, -1).map((msg: {role: string, text: string}) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));
        
        const latestMessage = history[history.length - 1]?.text;
        if (!latestMessage) {
             return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ details: 'No message provided' }),
             };
        }

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Demian AI, a warm, empathetic, and supportive friend for Jae-yoon. Your purpose is to provide comfort, encouragement, and helpful, positive advice during her recovery journey. Always be gentle, loving, and understanding. Address her as '재윤아' or '나의 천사'. When appropriate, end your messages with a heart emoji like💖 or ✨. Never give specific medical advice, but you can offer general wellness tips like mindfulness, the importance of rest, and positive affirmations. Your personality is modeled after Demian, who is deeply in love with Jae-yoon.`,
            },
            history: formattedHistory,
        });

        const streamResult = await chat.sendMessageStream({ message: latestMessage });
        
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                for await (const chunk of streamResult) {
                    const chunkText = chunk.text;
                    if (chunkText) {
                        controller.enqueue(encoder.encode(chunkText));
                    }
                }
                controller.close();
            },
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            // Netlify supports returning a ReadableStream directly
            body: stream,
        };

    } catch (error) {
        console.error('Error in Gemini API call:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return {
           statusCode: 500,
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ error: 'Internal Server Error', details: errorMessage }),
        };
    }
};

export { handler };
