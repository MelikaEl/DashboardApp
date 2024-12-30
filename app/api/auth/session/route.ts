import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');
  
  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.split('Bearer ')[1];
    
    // Set the session cookie
    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  }

  return NextResponse.json({ success: true });
}