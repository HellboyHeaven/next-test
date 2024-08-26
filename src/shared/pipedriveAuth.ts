import { ApiClient } from "./pipedriveAPI";

export const pipedriveAuth = () => {
  const clientId = process.env.CLIENT_ID!;
  const clientSecret = process.env.CLIENT_SECRET!;
  const redirectURL = process.env.REDIRECT_URL!;

  // Return an instance of ApiClient
  return new ApiClient(clientId, clientSecret, redirectURL);
  }