import { createReducer, createActions } from 'reduxsauce'

export const emailKey = 'authEmail',
             viewerKey = 'authViewer',
             tokenKey = 'authToken'

const { Types, Creators } = createActions({
  login: ['email', 'viewer', 'token'],
  logout: []
})

const lsGet = (key) => (
  // localStorage isn't defined when our tests import this file.
  ((typeof(localStorage) !== 'undefined') && localStorage.getItem(key))
  || undefined
)

const initialState = {
  email: lsGet(emailKey),
  viewer: lsGet(viewerKey),
  token: lsGet(tokenKey)
}

const login = (state = initialState, action) => {
  const { email, viewer, token } = action
  localStorage.setItem(emailKey, email);
  localStorage.setItem(viewerKey, viewer);
  localStorage.setItem(tokenKey, token);
  return {...state, token, viewer, email}
}

const logout = (state = initialState, action) => {
  localStorage.removeItem(emailKey);
  localStorage.removeItem(viewerKey);
  localStorage.removeItem(tokenKey);
  return {...state, token: undefined, viewer: undefined, email: undefined}
}

const authReducer = createReducer(initialState, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout
})

export { authReducer, Types, Creators }
