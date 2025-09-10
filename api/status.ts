import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel 서버리스 함수 (Node.js 런타임)
export default function handler(req: VercelRequest, res: VercelResponse) {
    // GET 요청만 허용
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const apiKey = process.env.API_KEY;

        if (apiKey && apiKey.length > 0) {
            // 키가 존재하면 성공 응답
            return res.status(200).json({ status: 'ok' });
        } else {
            // 키가 없으면 설정 필요 응답 (프론트엔드에서 처리하기 쉽도록 200 OK로 응답)
            return res.status(200).json({ status: 'error', reason: 'API_KEY_MISSING' });
        }
    } catch (error) {
        console.error('Error in API status check:', error);
        return res.status(500).json({ status: 'error', reason: 'INTERNAL_SERVER_ERROR' });
    }
}