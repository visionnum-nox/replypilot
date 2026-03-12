import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, password] = atob(authValue).split(':')
    
    if (user === 'admin' && password === 'replypilot2026') {
      return NextResponse.next()
    }
  }
  
  return new NextResponse('Authentication Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ReplyPilot"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
