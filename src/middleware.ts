import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './shared/oauth'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authURL = await createClient().buildAuthURL()
  return NextResponse.redirect(authURL)
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }