import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export default function handler(request: VercelRequest, response: VercelResponse) {
  response.status(250).json({
    body: 'hello world',
    query: request.query,
    cookies: request.cookies,
  });
}