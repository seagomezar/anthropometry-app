const adminEmail = (process.env.REACT_APP_ADMIN_EMAIL || 'admin@anthropometry.com').toLowerCase().trim();
const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'Admin2026!';

const hasuraUri =
  process.env.REACT_APP_HASURA_GRAPHQL_URL ||
  'https://nutrition-app.hasura.app/v1/graphql';

const getHasuraHeaders = () => {
  const adminSecret = (
    process.env.REACT_APP_HASURA_ADMIN_SECRET ||
    process.env.REACT_APP_HASURA_API_KEY ||
    process.env.REACT_APP_HASHURA_API_KEY ||
    ''
  ).trim();

  const headers = {
    'Content-Type': 'application/json',
  };
  if (adminSecret) {
    headers['x-hasura-admin-secret'] = adminSecret;
  }
  return headers;
};

const queryNutritionist = async (email) => {
  try {
    const response = await fetch(hasuraUri, {
      method: 'POST',
      headers: getHasuraHeaders(),
      body: JSON.stringify({
        query: `
          query FindNutritionist($email: String!) {
            nutritionist(where: { email: { _ilike: $email } }, limit: 1) {
              id
              firstname
              lastname
              email
              password
            }
          }
        `,
        variables: { email: `%${email}%` },
      }),
    });
    const result = await response.json();
    return result?.data?.nutritionist?.[0] || null;
  } catch (err) {
    console.warn('Could not query nutritionist credentials from Hasura:', err);
    return null;
  }
};

const authProvider = {
  login: async ({ username, password }) => {
    const rawUsername = (username || '').toLowerCase().trim();
    const rawPassword = (password || '').trim();

    if (!rawUsername || !rawPassword) {
      return Promise.reject(new Error('auth.invalid_credentials'));
    }

    // 1. Check Super Admin Credentials
    if (
      (rawUsername === adminEmail || rawUsername === 'admin') &&
      rawPassword === adminPassword
    ) {
      const session = {
        id: 'super-admin',
        fullName: 'Super Administrador',
        email: adminEmail,
        role: 'admin',
      };
      localStorage.setItem('anthropometry_session', JSON.stringify(session));
      return Promise.resolve({ redirectTo: '/' });
    }

    // 2. Check Nutritionist Credentials via Hasura DB
    const nutritionist = await queryNutritionist(rawUsername);
    if (nutritionist) {
      const storedPassword = (nutritionist.password || '').trim();

      if (storedPassword && rawPassword === storedPassword) {
        const session = {
          id: nutritionist.id,
          fullName: `${nutritionist.firstname || ''} ${nutritionist.lastname || ''}`.trim() || 'Especialista',
          email: (nutritionist.email || rawUsername).trim(),
          role: 'nutritionist',
          nutritionistId: nutritionist.id,
        };
        localStorage.setItem('anthropometry_session', JSON.stringify(session));
        return Promise.resolve({ redirectTo: '/' });
      }
    }

    return Promise.reject(new Error('auth.invalid_credentials'));
  },

  logout: () => {
    localStorage.removeItem('anthropometry_session');
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('anthropometry_session');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const session = localStorage.getItem('anthropometry_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed?.role) {
          return Promise.resolve();
        }
      } catch {
        localStorage.removeItem('anthropometry_session');
      }
    }
    return Promise.reject();
  },

  getIdentity: () => {
    const session = localStorage.getItem('anthropometry_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        return Promise.resolve({
          id: parsed.id,
          fullName: parsed.fullName || 'Usuario',
          role: parsed.role,
        });
      } catch {
        // ignore
      }
    }
    return Promise.resolve({ id: 'guest', fullName: 'Invitado', role: 'guest' });
  },

  getPermissions: () => {
    const session = localStorage.getItem('anthropometry_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed?.role) {
          return Promise.resolve({
            role: parsed.role,
            nutritionistId: parsed.nutritionistId,
          });
        }
      } catch {
        // ignore
      }
    }
    return Promise.resolve(null);
  },
};

export default authProvider;
