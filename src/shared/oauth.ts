import { getCookie, setCookie } from 'cookies-next';
import { ApiClient } from './pipedriveAPI';
import { CookiesFn } from 'cookies-next/lib/types';
import { cookies } from 'next/headers';


export type initAPiclientParam = {
  accessToken: string,
  refreshToken: string,
  code: string,
  cookies: CookiesFn
}

// Initialize the API client
export const initAPIClient = async ({accessToken = '', refreshToken = '', code = '', cookie = cookies}) => {
  const apiClient = new ApiClient(process.env.CLIENT_ID!, process.env.CLIENT_SECRET!, process.env.REDIRECT_URL!)

  if (accessToken && refreshToken) {
    apiClient.token = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expireIn: 0
    }
  }
  else if (code) {
    await apiClient.authrize(code)
  }
  initalizeSession(apiClient, cookie)

  return apiClient;
};

export const initalizeSession = (apiClient:ApiClient, cookies : CookiesFn) => setSessionCookie(apiClient, cookies)

export const updateToken = async (apiClient:ApiClient, cookies : CookiesFn) => {
  await apiClient.updateToken()
  initalizeSession(apiClient, cookies)
}


export const getAPIClient = (cookies : CookiesFn) : ApiClient => {
  const session = getCookie('session', { cookies }) as string;
  if (session === undefined) {
    console.log(session)
    console.log(cookies)
  }
  return JSON.parse(session).apiClient as ApiClient
}

const setSessionCookie = (apiClient: ApiClient, cookies : CookiesFn) => {
  const newSession = {
    apiClient: apiClient
  };
  const day = 3600*24*60
  // 1.4. Set the cookie
  setCookie('session', JSON.stringify(newSession), {cookies});
  return newSession;
}