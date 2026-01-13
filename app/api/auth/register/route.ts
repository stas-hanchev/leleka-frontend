import { NextRequest } from 'next/server';
import { proxyRequest } from '../../_helpers/proxy';

export async function POST(req: NextRequest) {
  return proxyRequest(req, '/auth/register');
}
