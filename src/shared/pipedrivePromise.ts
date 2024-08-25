import axios, { AxiosResponse, Method } from 'axios';

export interface AuthData {
    accessToken: string, 
    tokenType: string, 
    expireIn: number, 
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
    baseURL: 'https://oauth.pipedrive.com/oauth/token',
    headers: {'Content-Type': 'application/json', Accept: 'application/json',}},
)

export async function authrizePromise(code: string, clientId: string, clientSecret: string, redirectURL: string, ) {

    const body =  {
        grant_type: 'authorization_code',
        code: code, 
        redirect_uri: redirectURL
    };


    const res = await oauthPromise.post(
        '/', 
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
        '/', 
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
    if (res.status != 200)
        throw Error(res.statusText);


    return {
        accessToken: data.access_token, 
        tokenType: data.token_type, 
        expireIn: data.expire_in, 
        refreshToken: data.refresh_token, 
        scope: data.scope, 
        apiDomain: data.api_domain
    }
}




export async function executePromise(method: Method, api: string, body: {}, token: string, companyDomain: string )  {

    const headers = { Authorization: `Bearer ${token}` };

    const res = await axios({url: `https://${companyDomain}.pipedrive.com/api/v2${api}`, headers: headers, method: method, data: body})
    return res;
}