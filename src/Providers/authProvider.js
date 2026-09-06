import { Auth0Client } from "@auth0/auth0-spa-js";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI || (typeof window !== "undefined" ? window.location.origin : "");

let auth0 = null;
if (domain && clientId) {
  auth0 = new Auth0Client({
    domain,
    clientId,
    useRefreshTokens: true,
    cacheLocation: "localstorage",
    authorizationParams: {
      redirect_uri: redirectUri,
    },
  });
}

const authProvider = {
  // called when the user attempts to log in
  login: async () => {
    if (!auth0) {
      return Promise.reject(new Error("Auth0 domain or client ID not configured in environment variables."));
    }
    await auth0.loginWithPopup({
      authorizationParams: {
        redirect_uri: redirectUri,
      },
    });
    const user = await auth0.getUser();
    return Promise.resolve({ user });
  },
  // called when the user clicks on the logout button
  logout: () => {
    if (!auth0) {
      return Promise.resolve();
    }
    return auth0.isAuthenticated().then(function (isAuthenticated) {
      if (isAuthenticated) {
        return auth0.logout({
          logoutParams: {
            returnTo: window.location.origin + "/login",
          },
        });
      }
        return Promise.resolve();
    });
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    if (!auth0) {
      return Promise.resolve();
    }
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
      return Promise.resolve();
    }
    return auth0.getTokenSilently();
  },
  getIdentity: async () => {
    if (!auth0) {
      return Promise.resolve({});
    }
    const user = await auth0.getUser();
    return Promise.resolve({ user });
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
