
import { NextResponse, type NextRequest } from "next/server.js";
import  {initAPIClient} from "../../../shared/oauth"
import { cookies } from "next/headers.js";
import { redirect } from "next/dist/server/api-utils";

export async function GET(request : NextRequest) {
    const params = request.nextUrl.searchParams;
    const code = params.get('code') as string;
    const state = params.get('state') as string;
    if (!code) return new Response( 'error', {status:401})
    try {

        // Get the access token
        const client = await initAPIClient(code);
        cookies().set('apiClient', JSON.stringify(client), {sameSite: 'none', secure: true});
        if (state) {
            return NextResponse.redirect(state)
        }

        return new Response('Successfully authorized', {status: 200})
    } catch (error : any) {
       
        return new Response( error.message, {status: error.status} )
    }
};