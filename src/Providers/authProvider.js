import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  useRefreshTokens: true,
  cacheLocation: "localstorage",
  redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
});

// in src/authProvider.js
const authProvider = {
  // called when the user attempts to log in
  login: async (url) => {
    // return Promise.resolve()
    console.log(process.env.REACT_APP_HASHURA_API_KEY);
    await auth0.loginWithPopup({
      authorizationParams: {
        redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      },
    });
    //logged in. you can get the user profile like this:
    const user = await auth0.getUser();
    console.log(user);
    return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: () => {
    return auth0.isAuthenticated().then(function (isAuthenticated) {
      if (isAuthenticated) {
        // need to check for this as react-admin calls logout in case checkAuth failed
        return auth0.logout({
          redirect_uri: window.location.origin + "/login",
          federated: true, // have to be enabled to invalidate refresh token
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
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
      return Promise.resolve();
    }
    return auth0.getTokenSilently();
  },
  getIdentity: async () => {
    const user = await auth0.getUser();
    if(user && user.sub){
      const id = user.sub;
      const fullName = `${user.given_name} ${user.family_name}`;
      const avatar = user.picture; 
      return Promise.resolve({ id, fullName, avatar });
    } 
    return Promise.resolve({ user }); 
    
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
