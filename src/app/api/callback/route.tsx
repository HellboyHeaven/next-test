
import { type NextRequest } from "next/server.js";
import  {initAPIClient} from "../../../shared/oauth"
import { cookies } from "next/headers.js";

export async function GET(request : NextRequest) {
    const params = request.nextUrl.searchParams;
    try {
        const code = params.get('code') as string;
        // Get the access token
        initAPIClient({code:code, cookie: cookies});


        return new Response('Successfully authorized', {status: 200})
    } catch (error) {
        return new Response( 'error' , {status: 200})
    }
};