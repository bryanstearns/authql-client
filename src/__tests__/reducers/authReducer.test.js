import { LocalStorageMock } from '../TestHelpers'
global.localStorage = new LocalStorageMock
import { authReducer, emailKey, tokenKey, Types, Creators } from '../../reducers/authReducer'

test('login action creator', () => {
  expect(Creators.login("email", "token"))
    .toEqual({type: "LOGIN", email: "email", token: "token"})
})

test('login action', () => {
  expect(authReducer(undefined,
                     {type: "LOGIN", email: "email", token: "token"}))
    .toEqual({email: "email", token: "token"})
  expect(localStorage.getItem(emailKey)).toEqual("email")
  expect(localStorage.getItem(tokenKey)).toEqual("token")
})

test('logout action creator', () => {
  expect(Creators.logout()).toEqual({type: "LOGOUT"})
})

test('logout action', () => {
  expect(authReducer({email: "foo", token: "bar"}, {type: "LOGOUT"}))
    .toEqual({email: undefined, token: undefined})
  expect(localStorage.getItem(emailKey)).toBe(undefined)
  expect(localStorage.getItem(tokenKey)).toBe(undefined)
})
