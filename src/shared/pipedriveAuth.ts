export const pipedriveAuth = () => {
    return {clientId: process.env.CLIENT_ID!, clientSecret: process.env.CLIENT_SECRET!, redirectURL: process.env.REDIRECT_URL!};
  }