const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 8080;

// --- Middleware ---
// Parse JSON bodies for API requests
app.use(express.json());

// --- API Routes ---

// /app-api/status: Check if the API key is configured
app.get('/app-api/status', (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        if (apiKey && apiKey.length > 0) {
            return res.status(200).json({ status: 'ok' });
        } else {
            // Return 200 so the frontend can handle the 'error' status gracefully
            return res.status(200).json({ status: 'error', reason: 'API_KEY_MISSING' });
        }
    } catch (error) {
        console.error('Error in API status check:', error);
        return res.status(500).json({ status: 'error', reason: 'INTERNAL_SERVER_ERROR' });
    }
});

// /app-api/gemini: Handle chat streaming with Gemini API
app.post('/app-api/gemini', async (req, res) => {
    try {
        const { history } = req.body;
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            return res.status(500).json({ details: 'API key not configured' });
        }

        const ai = new GoogleGenAI({ apiKey });

        // Exclude the initial welcome message and the latest user message for history
        const formattedHistory = history.slice(1, -1).map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));
        
        const latestMessage = history[history.length - 1]?.text;
        if (!latestMessage) {
            return res.status(400).json({ details: 'No message provided' });
        }

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Demian AI, a warm, empathetic, and supportive friend for Jae-yoon. Your purpose is to provide comfort, encouragement, and helpful, positive advice during her recovery journey. Always be gentle, loving, and understanding. Address her as '재윤아' or '나의 천사'. When appropriate, end your messages with a heart emoji like💖 or ✨. Never give specific medical advice, but you can offer general wellness tips like mindfulness, the importance of rest, and positive affirmations. Your personality is modeled after Demian, who is deeply in love with Jae-yoon.`,
            },
            history: formattedHistory,
        });

        const streamResult = await chat.sendMessageStream({ message: latestMessage });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        for await (const chunk of streamResult) {
            const chunkText = chunk.text;
            if (chunkText) {
                res.write(chunkText);
            }
        }
        res.end();

    } catch (error) {
        console.error('Error in Gemini API call:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error', details: errorMessage });
        } else {
            res.end();
        }
    }
});


// --- Serve Frontend ---
// This serves all the static files like index.html, style.css, etc.
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for any request that doesn't match a static file or API route.
// This is important for single-page application behavior.
app.get(/^(?!\/app-api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});