// Vercel Edge Runtime에서 실행되도록 설정
export const config = {
  runtime: 'edge',
};

// Vercel 서버리스 함수의 핸들러
export default async function handler(req: Request) {
    // GET 요청만 허용
    if (req.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const apiKey = process.env.API_KEY;

        if (apiKey && apiKey.length > 0) {
            // 키가 존재하면 성공 응답
            return new Response(JSON.stringify({ status: 'ok' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // 키가 없으면 설정 필요 응답
            return new Response(JSON.stringify({ status: 'error', reason: 'API_KEY_MISSING' }), {
                status: 200, // 200 OK로 반환하여 프론트엔드에서 에러 처리를 용이하게 함
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error in API status check:', error);
        return new Response(JSON.stringify({ status: 'error', reason: 'INTERNAL_SERVER_ERROR' }), { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
        });
    }
}
