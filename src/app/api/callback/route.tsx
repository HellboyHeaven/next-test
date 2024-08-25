
import { type NextRequest } from "next/server.js";
import  {initAPIClient} from "../../../shared/oauth"
import { cookies } from "next/headers.js";

export async function GET(request : NextRequest) {
    const params = request.nextUrl.searchParams;
    const code = params.get('code') as string;
    if (!code) return new Response( 'error', {status:401})
    try {
        // Get the access token
        initAPIClient({code:code});
        request.cookies.set('suka', '125')


        return new Response('Successfully authorized', {status: 200})
    } catch (error) {
        return new Response( 'error', {status: 401} )
    }
};