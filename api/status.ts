import type { Handler, HandlerEvent } from '@netlify/functions';

// Netlify serverless function
const handler: Handler = async (event: HandlerEvent) => {
    // GET requests only
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: { 'Allow': 'GET' },
            body: 'Method Not Allowed'
        };
    }

    try {
        const apiKey = process.env.API_KEY;

        let body;
        if (apiKey && apiKey.length > 0) {
            // Key exists
            body = { status: 'ok' };
        } else {
            // Key is missing, respond so the frontend can handle it
            body = { status: 'error', reason: 'API_KEY_MISSING' };
        }
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

    } catch (error) {
        console.error('Error in API status check:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'error', reason: 'INTERNAL_SERVER_ERROR' })
        };
    }
};

export { handler };
