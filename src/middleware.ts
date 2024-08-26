import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { ApiClient } from './shared/pipedriveAPI'
import { pipedriveAuth } from './shared/pipedriveAuth'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const cookie = cookies().get('apiClient')?.value as string
    if (cookie === undefined) throw Error('no api client cookie')
    const apiClient = JSON.parse(cookie) as ApiClient
    if (apiClient === undefined || apiClient.token === undefined) {
      throw Error('no token')
    }
    console.log('expires in: ', (Date.now() - apiClient.token.expireAt)/1000)
    if (apiClient.token.expireAt < Date.now()) {
      await apiClient.updateToken()
    }
  } catch(error : Error | any) {
    const client = pipedriveAuth();
    console.log('pipeAuth',  JSON.stringify(client), '\n', request.redirect.toString())
    console.log(error.message)
    // const authURL = client.buildAuthURL(request.nextUrl.toString())
   
    // return NextResponse.redirect(authURL)
  }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api/callback).*)',
}