import { GoogleGenAI, Content } from '@google/genai';

// Vercel Edge Runtime에서 실행되도록 설정
export const config = {
  runtime: 'edge',
};

// Vercel 서버리스 함수의 핸들러
export default async function handler(req: Request) {
    // POST 요청만 허용
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        // 요청 본문에서 채팅 기록을 가져옴
        const { history } = await req.json();
        const apiKey = process.env.API_KEY;

        // API 키가 설정되지 않은 경우 오류 반환
        if (!apiKey) {
            return new Response(JSON.stringify({ details: 'API key not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' }});
        }
        
        const ai = new GoogleGenAI({ apiKey });

        // 프론트엔드에서 받은 채팅 기록을 Gemini API가 요구하는 형식으로 변환
        // 첫 번째 환영 메시지와 마지막 사용자 메시지는 제외
        const formattedHistory: Content[] = history.slice(1, -1).map((msg: {role: string, text: string}) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));
        
        // 마지막 사용자 메시지를 가져옴
        const latestMessage = history[history.length - 1]?.text;
        if (!latestMessage) {
             return new Response(JSON.stringify({ details: 'No message provided' }), { status: 400, headers: { 'Content-Type': 'application/json' }});
        }

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are Demian AI, a warm, empathetic, and supportive friend for Jae-yoon. Your purpose is to provide comfort, encouragement, and helpful, positive advice during her recovery journey. Always be gentle, loving, and understanding. Address her as '재윤아' or '나의 천사'. When appropriate, end your messages with a heart emoji like💖 or ✨. Never give specific medical advice, but you can offer general wellness tips like mindfulness, the importance of rest, and positive affirmations. Your personality is modeled after Demian, who is deeply in love with Jae-yoon.`,
            },
            history: formattedHistory,
        });

        const streamResult = await chat.sendMessageStream({ message: latestMessage });
        
        // SDK의 스트림을 표준 응답 스트림으로 변환
        const responseStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of streamResult) {
                    const chunkText = chunk.text;
                    if (chunkText) {
                        controller.enqueue(new TextEncoder().encode(chunkText));
                    }
                }
                controller.close();
            }
        });

        return new Response(responseStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error('Error in Gemini API call:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: errorMessage }), { status: 500, headers: {'Content-Type': 'application/json'} });
    }
}
