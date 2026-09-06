import byPassAuthProvider from './byPassAuthProvider';

describe('byPassAuthProvider', () => {
  it('should resolve all authentication hook promises successfully', async () => {
    await expect(byPassAuthProvider.login()).resolves.toBeUndefined();
    await expect(byPassAuthProvider.checkError()).resolves.toBeUndefined();
    await expect(byPassAuthProvider.checkAuth()).resolves.toBeUndefined();
    await expect(byPassAuthProvider.logout()).resolves.toBeUndefined();
    await expect(byPassAuthProvider.getIdentity()).resolves.toBeUndefined();
    await expect(byPassAuthProvider.getPermissions()).resolves.toBeUndefined();
  });
});
