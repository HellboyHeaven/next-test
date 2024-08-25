import { ApiClient } from './pipedriveAPI';;
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';




// Initialize the API client
export const initAPIClient = async ({accessToken = '', refreshToken = '', code = ''}, cookies: ReadonlyRequestCookies) => {
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
  initalizeSession(apiClient, cookies)

  return apiClient;
};

export const initalizeSession = (apiClient:ApiClient, cookies : ReadonlyRequestCookies) => setSessionCookie(apiClient, cookies)

export const updateToken = async (apiClient:ApiClient, cookies : ReadonlyRequestCookies) => {
  await apiClient.updateToken()
  initalizeSession(apiClient, cookies)
}


export const getAPIClient = (cookies : ReadonlyRequestCookies) : ApiClient => {
  if (!cookies.has('session')) {
    console.log(cookies.getAll())
    throw Error('UnAutorized')
  }
  const session = cookies.get('session')?.value as string;
 
  return JSON.parse(session).apiClient as ApiClient
}

const setSessionCookie = (apiClient: ApiClient, cookies : ReadonlyRequestCookies) => {
  const newSession = {
    apiClient: apiClient
  };
  
  cookies.set(
    "session",
    JSON.stringify(newSession),
    {
    maxAge: 30000000000,
    sameSite: 'none',
    secure: false,
  });
  console.log(cookies.getAll())

  // 1.4. Set the cookie
  return newSession;
}