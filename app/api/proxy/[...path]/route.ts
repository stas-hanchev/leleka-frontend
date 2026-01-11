import { NextRequest } from 'next/server';
import { proxyRequest } from '@/app/api/_helpers/proxy';

async function handler(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const backendPath = pathname.replace('/api/proxy', '') || '/';
  return proxyRequest(req, backendPath);
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
