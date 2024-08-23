import { NextRequest, NextResponse } from "next/server";
import  {getLoggedInUser, initalizeSession, initAPIClient, updateTokens} from "../../../shared/oauth.js"
import { cookies } from "next/headers.js";

export default async function GET(request : NextRequest, response : NextResponse) {
    const params = request.nextUrl.searchParams;
    try {
        const code = params.get('code') as string;
        // Get the access token
        const apiClient = initAPIClient();
        const token = await apiClient.authorize(code);

        updateTokens(apiClient, token);
        // Get the currently logged in user
        const user = await getLoggedInUser(apiClient);
        const me = user.data;
        //initalize session
        initalizeSession(cookies, token, me.id)
        return new Response('Successfully authorized', {status: 200})
    } catch (error) {
        return new Response( 'error' , {status: 200})
    }
};