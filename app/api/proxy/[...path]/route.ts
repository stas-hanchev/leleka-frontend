import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_helpers/proxy';
async function universalHandler(req: NextRequest) {
  const { pathname } = new URL(req.url);

  
  let backendPath = pathname.replace('/api/proxy', '');
  if (!backendPath) backendPath = '/';
  if (!backendPath.startsWith('/')) backendPath = '/' + backendPath;

  console.log('[Route] Proxying to backendPath:', backendPath);

  return proxyRequest(req, backendPath);
}

export async function GET(req: NextRequest) {
  return universalHandler(req);
}

export async function POST(req: NextRequest) {
  return universalHandler(req);
}