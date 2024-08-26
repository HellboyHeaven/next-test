import { cookies } from 'next/headers';
import { ApiClient } from './pipedriveAPI';import { NextRequest } from 'next/server';
;


export const createClient = () => {
  return new ApiClient(process.env.CLIENT_ID!, process.env.CLIENT_SECRET!, process.env.REDIRECT_URL!)
}

// Initialize the API client
export const initAPIClient = async (code = '') => {
  const apiClient = createClient();

  
  if (code) {
    await apiClient.authrize(code)
  }
  else {
    throw Error('Code is absent')
  }

  return apiClient;
};

export const updateToken = async (apiClient:ApiClient) => {
  await apiClient.updateToken()
}
