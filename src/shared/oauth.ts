import { getCookie, setCookie } from 'cookies-next';
import { ApiClient, DealsAPI } from './pipedriveAPI';
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
  return JSON.parse(session).apiClient as ApiClient
}
  
//   // Generate the authorization URL for the 1st step
// export const getAuthorizationUrl = (apiClient) => {
//   const authUrl = apiClient.buildAuthorizationUrl();
//   console.log('Authorization URL generated');
//   return authUrl;
// };
  
// // Get the currently authorized user details
// export const getLoggedInUser = async (apiClient) => {
//   const api = new UsersApi(apiClient);
//   const data = await api.getCurrentUser();
//   console.log('Currently logged-in user details obtained');
//   return data;
// };
  
// // Update Access and Refresh tokens
// export const updateTokens = (apiClient, token) => {
//   console.log('Updating access + refresh token details');
//   const oauth2 = client.authentications.oauth2;
//   oauth2.accessToken = token.access_token;
//   oauth2.refreshToken = token.refresh_token;
// };


// export const initalizeSession = async ( cookies, accessToken, userId) => {
//   try {
//     // 1.1 Check if the session cookie is already set
//     console.log(`Checking if a session cookie is set for ${userId}`);
//     const session = getCookie('session', { cookies }); 

//     if (!session) {
//       log.info('Session cookie no found. Session cookie set 🍪');
//       return setSessionCookie(
//         true,
//         userId,
//         accessToken,
//         String(Date.now() + 59 * 60 * 1000),
//         req,
//         res
//       );
//     }
    
//     console.log('Session cookie found 🍪');
//     return JSON.parse(session);
    
    

    
//   }
//   catch {
//     console.error("Couldn't create session :[");
//     console.error(error);
//   }
  
// }


const setSessionCookie = (apiClient: ApiClient, cookies : CookiesFn) => {
  const newSession = {
    apiClient: apiClient
  };
  const day = 3600*24*60
  // 1.4. Set the cookie
  setCookie('session', JSON.stringify(newSession), {cookies});
  return newSession;
}