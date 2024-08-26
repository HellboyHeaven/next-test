import { cookies } from 'next/headers';
import { ApiClient } from './pipedriveAPI';import { NextRequest } from 'next/server';
import { pipedriveAuth } from './pipedriveAuth';
;


// Initialize the API client
export const initAPIClient = async (code = '') => {
  const apiClient = pipedriveAuth() as ApiClient;

  
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
