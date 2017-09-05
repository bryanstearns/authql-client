import {
  apolloClient,
  LoginPanel,
  Login,
  Logout,
  withAuth,
  graphqlWithAuth,
  authReducer,
  AuthTypes,
  AuthCreators
} from '../index'

test('all our exports are good', () => {
  expect(apolloClient).toBeDefined()
  expect(LoginPanel).toBeDefined()
  expect(Login).toBeDefined()
  expect(Logout).toBeDefined()
  expect(withAuth).toBeDefined()
  expect(graphqlWithAuth).toBeDefined()
  expect(authReducer).toBeDefined()
  expect(AuthTypes).toBeDefined()
  expect(AuthCreators).toBeDefined()
})
