import { cookies, cookies } from 'next/headers';
import { ApiClient } from './pipedriveAPI';import { NextRequest } from 'next/server';
;




// Initialize the API client
export const initAPIClient = async ({accessToken = '', refreshToken = '', code = ''}) => {
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
  initalizeSession(apiClient)

  return apiClient;
};

export const initalizeSession = (apiClient:ApiClient) => setSessionCookie(apiClient)

export const updateToken = async (apiClient:ApiClient) => {
  await apiClient.updateToken()
  initalizeSession(apiClient)
}


export const getAPIClient = () : ApiClient => getSessionCookie().apiClient;



export type Session ={
  apiClient : ApiClient
}

const getSessionCookie = () : Session => {
  const cookieStore = cookies();
  if (!cookies.has('session')) {
    console.log(cookieStore.getAll())
    throw Error('UnAutorized')
  }
  const session = cookieStore.get('session')?.value as string;
  return JSON.parse(session)
}

const setSessionCookie = (apiClient: ApiClient) => {
  const cookieStore = cookies();
  const newSession = {
    apiClient: apiClient
  };


  cookieStore.set(
    "session",
    JSON.stringify(newSession),
    {sameSite: 'none', secure:true}
    );

  console.log(cookieStore.getAll())

  // 1.4. Set the cookie
  return newSession;
}