import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './shared/oauth'
import { cookies } from 'next/headers'
import { ApiClient } from './shared/pipedriveAPI'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const apiClient = JSON.parse(cookies().get('apiClient')?.value as string) as ApiClient
    if (apiClient.token!.expireAt < Date.now()) {
      throw Error('token expired')
    }
  } catch {
    const client = createClient();
    const authURL = client.buildAuthURL(request.nextUrl.toString())
   
    return NextResponse.redirect(authURL)
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api/callback).*)',
}