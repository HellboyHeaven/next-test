import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { ApiClient } from './shared/pipedriveAPI'
import { pipedriveAuth } from './shared/pipedriveAuth'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const apiClient = JSON.parse(cookies().get('apiClient')?.value as string) as ApiClient
    if (apiClient === undefined || apiClient.token === undefined) {
      throw Error('no token')
    }
    if (apiClient.token.expireAt < Date.now()) {
      console.log('expires in: ', (Date.now() - apiClient.token.expireAt)/1000)
      await apiClient.updateToken()
    }
  } catch {
    const client = pipedriveAuth();
    console.log(JSON.stringify(client), '\n', request.redirect.toString())
    const authURL = client.buildAuthURL(request.nextUrl.toString())
   
    return NextResponse.redirect(authURL)
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api/callback).*)',
}