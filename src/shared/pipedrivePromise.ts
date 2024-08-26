import { Token } from '@/types/tokenType';
import axios, { AxiosResponse, Method } from 'axios';
import { updateToken } from './oauth';
import { pipedriveAuth } from './pipedriveAuth';

export interface AuthData {
    accessToken: string, 
    tokenType: string, 
    expireAt: number, 
    refreshToken: string 
    scope: string, 
    apiDomain: string
}

export interface ErrorResponse
{ 
    success: boolean, 
    data:{ 
        message: string, 
        code: string 
    } 
}

const oauthPromise = axios.create({
    baseURL: 'https://oauth.pipedrive.com/oauth',
    headers: {'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json',}},
)

export async function authrizePromise(code: string, clientId: string, clientSecret: string, redirectURL: string, ) {

    const body =  {
        grant_type: 'authorization_code',
        code: code, 
        redirect_uri: redirectURL
    };


    const res = await oauthPromise.post(
        '/token', 
        body,
        {
            auth: {
                username: clientId,
                password: clientSecret
            }
        }
    );

    return verifyAuthData(res)
}

export async function refreshTokenPromise(refreshToken: string, clientId: string, clientSecret: string) {
    const body =  {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    };

    const res = await oauthPromise.post(
        '/token', 
        body,
        {
            auth: {
                username: clientId,
                password: clientSecret
            }
        }
    );

    return verifyAuthData(res)
}


function verifyAuthData(res: AxiosResponse) : AuthData {
    const data = res.data
    console.log(JSON.stringify(data))
    if (res.status != 200)
        throw Error(data.data.message, {cause:res.status});

    return {
        accessToken: data.access_token, 
        tokenType: data.token_type, 
        expireAt: data.expires_in * 1000 + Date.now(), 
        refreshToken: data.refresh_token, 
        scope: data.scope, 
        apiDomain: data.api_domain
    }
}

export async function executePromise(method: Method, url: string, body: {}, token: Token) {
    console.log(token.expireAt < Date.now())
    if (token.expireAt < Date.now()) {
        const client = pipedriveAuth();
        const {accessToken, refreshToken} = await refreshTokenPromise(token.refreshToken, client.clientId, client.clientSecret)
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
    }
    const headers = { Authorization: `Bearer ${token.accessToken}` };

    return await axios({url: url, headers: headers, method: method, data: body})
}


export async function executePromiseV1(method: Method, api: string, body: {}, token: Token, companyDomain: string )  {
    console.log(`${companyDomain}/v1${api}`)
    return await executePromise(method,  `${companyDomain}/v1${api}`, body, token);
}

export async function executePromiseV2(method: Method, api: string, body: {}, token: Token, companyDomain: string )  {
    return await executePromise(method,  `${companyDomain}/api/v2${api}`, body, token);
}

