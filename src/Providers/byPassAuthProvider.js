const byPassAuthProvider = {
    // send username and password to the auth server and get back credentials
    login: params => Promise.resolve(),
    // when the dataProvider returns an error, check if this is an authentication error
    checkError: error => Promise.resolve(),
    // when the user navigates, make sure that their credentials are still valid
    checkAuth: params => Promise.resolve(),
    // remove local credentials and notify the auth server that the user logged out
    logout: () => Promise.resolve(),
    // get the user's profile
    getIdentity: () => Promise.resolve(),
    // get the user permissions (optional)
    getPermissions: () => Promise.resolve(),
};

export default byPassAuthProvider;