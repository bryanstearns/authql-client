import { createReducer, createActions } from 'reduxsauce'

export const emailKey = 'authEmail',
             tokenKey = 'authToken'

const { Types, Creators } = createActions({
  login: ['email', 'token'],
  logout: []
})

const lsGet = (key) => (
  // localStorage isn't defined when our tests import this file.
  ((typeof(localStorage) !== 'undefined') && localStorage.getItem(key))
  || undefined
)

const initialState = {
  email: lsGet(emailKey),
  token: lsGet(tokenKey)
}

const login = (state = initialState, action) => {
  const { email, token } = action
  localStorage.setItem(emailKey, email);
  localStorage.setItem(tokenKey, token);
  return {...state, token, email}
}

const logout = (state = initialState, action) => {
  localStorage.removeItem(emailKey);
  localStorage.removeItem(tokenKey);
  return {...state, token: undefined, email: undefined}
}

const authReducer = createReducer(initialState, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout
})

export { authReducer, Types, Creators }
