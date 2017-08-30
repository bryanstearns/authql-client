import { LocalStorageMock } from '../TestHelpers'
global.localStorage = new LocalStorageMock
import { authReducer, emailKey, tokenKey, viewerKey, Types, Creators } from
  '../../reducers/authReducer'

test('login action creator', () => {
  expect(Creators.login("email", "viewer", "token"))
    .toEqual({type: "LOGIN", email: "email", viewer: "viewer", token: "token"})
})

test('login action', () => {
  expect(authReducer(undefined,
                     {type: "LOGIN", email: "email", viewer: "viewer",
                      token: "token"}))
    .toEqual({email: "email", viewer: "viewer", token: "token"})
  expect(localStorage.getItem(emailKey)).toEqual("email")
  expect(localStorage.getItem(viewerKey)).toEqual("viewer")
  expect(localStorage.getItem(tokenKey)).toEqual("token")
})

test('logout action creator', () => {
  expect(Creators.logout()).toEqual({type: "LOGOUT"})
})

test('logout action', () => {
  expect(authReducer({email: "foo", viewer: "123", token: "bar"}, {type: "LOGOUT"}))
    .toEqual({email: undefined, viewer: undefined, token: undefined})
  expect(localStorage.getItem(emailKey)).toBe(undefined)
  expect(localStorage.getItem(viewerKey)).toBe(undefined)
  expect(localStorage.getItem(tokenKey)).toBe(undefined)
})
