import { cookies } from 'next/headers';
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

  return apiClient;
};

export const updateToken = async (apiClient:ApiClient) => {
  await apiClient.updateToken()
}
