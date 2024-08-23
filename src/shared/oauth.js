import Pipedrive from 'pipedrive';
import { getCookie, setCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

let apiClient

// Initialize the API client
export const initAPIClient = ({ accessToken = '', refreshToken = '' }) => {
  
  apiClient = new Pipedrive.ApiClient();
  const oauth2 = apiClient.authentications.oauth2;
  oauth2.clientId =  process.env.CLIENT_ID; // OAuth 2 Client ID
  oauth2.clientSecret =  process.env.CLIENT_SECRET; // OAuth 2 Client Secret
  oauth2.redirectUri =  process.env.REDIRECT_URL; 

  if (accessToken) oAuth2.accessToken = accessToken;
  if (refreshToken) oAuth2.refreshToken = refreshToken;;
  
  return apiClient;
};

export const getAPIClient = (cookies) => {
  const session = getCookie('session', { cookies });
  return initAPIClient({
    accessToken: JSON.parse(session).token,
  })
}
  
  // Generate the authorization URL for the 1st step
export const getAuthorizationUrl = (apiClient) => {
  const authUrl = apiClient.buildAuthorizationUrl();
  console.log('Authorization URL generated');
  return authUrl;
};
  
// Get the currently authorized user details
export const getLoggedInUser = async (apiClient) => {
  const api = new UsersApi(apiClient);
  const data = await api.getCurrentUser();
  console.log('Currently logged-in user details obtained');
  return data;
};
  
// Update Access and Refresh tokens
export const updateTokens = (apiClient, token) => {
  console.log('Updating access + refresh token details');
  const oauth2 = client.authentications.oauth2;
  oauth2.accessToken = token.access_token;
  oauth2.refreshToken = token.refresh_token;
};


export const initalizeSession = async ( cookies, accessToken, userId) => {
  try {
    // 1.1 Check if the session cookie is already set
    console.log(`Checking if a session cookie is set for ${userId}`);
    const session = getCookie('session', { cookies }); 

    if (!session) {
      log.info('Session cookie no found. Session cookie set 🍪');
      return setSessionCookie(
        true,
        userId,
        accessToken,
        String(Date.now() + 59 * 60 * 1000),
        req,
        res
      );
    }
    
    console.log('Session cookie found 🍪');
    return JSON.parse(session);
    
    

    
  }
  catch {
    console.error("Couldn't create session :[");
    console.error(error);
  }
  
}


const setSessionCookie = (auth, userId, token, expiry, req, res) => {
  const newSession = {
    auth,
    userId,
    token,
  };

  const cookieParams = {
    maxAge: Math.round((parseInt(expiry) - Date.now()) / 1000),
    sameSite: 'none',
    secure: true,
    req,
    res,
  };
  // 1.4. Set the cookie
  setCookie('session', JSON.stringify(newSession), cookieParams);

  return newSession;
}