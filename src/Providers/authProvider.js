import { verifyPassword, hashPassword } from '../Utils/cryptoUtils';

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

    // 2. Check Nutritionist Credentials via Hasura DB (salted hash or legacy plaintext)
    const nutritionist = await queryNutritionist(rawUsername);
    if (nutritionist) {
      const storedPassword = (nutritionist.password || '').trim();
      const isValid = await verifyPassword(rawPassword, storedPassword);

      if (isValid) {
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

  getNutritionistProfile: async (id) => {
    try {
      const response = await fetch(hasuraUri, {
        method: 'POST',
        headers: getHasuraHeaders(),
        body: JSON.stringify({
          query: `
            query GetNutritionistDetails($id: Int!) {
              nutritionist_by_pk(id: $id) {
                id
                firstname
                lastname
                email
                phone
                address
                password
                users_aggregate {
                  aggregate {
                    count
                  }
                }
              }
            }
          `,
          variables: { id: Number(id) },
        }),
      });
      const result = await response.json();
      return result?.data?.nutritionist_by_pk || null;
    } catch (err) {
      console.warn('Could not fetch nutritionist details:', err);
      return null;
    }
  },

  updateNutritionistProfile: async ({
    id,
    firstname,
    lastname,
    phone,
    address,
    currentPassword,
    newPassword,
  }) => {
    // 1. Fetch current record to verify password
    const current = await authProvider.getNutritionistProfile(id);
    if (!current) throw new Error('profile.not_found');

    // Verify current password
    const storedPassword = (current.password || '').trim();
    const isCurrentValid = await verifyPassword(currentPassword, storedPassword);
    if (!isCurrentValid) {
      throw new Error('profile.current_password_invalid');
    }

    const changes = {
      firstname: firstname !== undefined ? firstname : current.firstname,
      lastname: lastname !== undefined ? lastname : current.lastname,
      phone: phone !== undefined ? phone : current.phone,
      address: address !== undefined ? address : current.address,
    };

    if (newPassword && newPassword.trim()) {
      changes.password = await hashPassword(newPassword.trim());
    }

    const response = await fetch(hasuraUri, {
      method: 'POST',
      headers: getHasuraHeaders(),
      body: JSON.stringify({
        query: `
          mutation UpdateNutritionist($id: Int!, $changes: nutritionist_set_input!) {
            update_nutritionist_by_pk(pk_columns: { id: $id }, _set: $changes) {
              id
              firstname
              lastname
              email
              phone
              address
            }
          }
        `,
        variables: {
          id: Number(id),
          changes,
        },
      }),
    });

    const result = await response.json();
    const updated = result?.data?.update_nutritionist_by_pk;
    if (!updated) throw new Error('profile.update_failed');

    // Update local session identity if name changed
    const session = localStorage.getItem('anthropometry_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (Number(parsed.id) === Number(id)) {
          parsed.fullName = `${updated.firstname || ''} ${updated.lastname || ''}`.trim() || parsed.fullName;
          localStorage.setItem('anthropometry_session', JSON.stringify(parsed));
        }
      } catch {
        // ignore
      }
    }

    return updated;
  },

  requestPasswordAssistance: async (email) => {
    const rawEmail = (email || '').toLowerCase().trim();
    if (!rawEmail) throw new Error('forgot_password.empty_email');
    const existing = await queryNutritionist(rawEmail);
    return {
      recognized: !!existing,
      email: rawEmail,
    };
  },
};

export default authProvider;

