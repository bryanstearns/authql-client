import React from 'react'
import { mount } from 'enzyme'
import { LocalStorageMock } from '../TestHelpers'
global.localStorage = new LocalStorageMock

import { Login } from '../../containers/Login'
import { LoginPanel } from '../../components/LoginPanel'

const setup = () => {
  const props = {
    client: {resetStore: jest.fn()},
    history: {goBack: jest.fn()},
    mutate: jest.fn(),
    onLogin: jest.fn()
  }
  const wrapper = mount(<Login {...props} />)
  return {props, wrapper}
}

test('it renders the panel', () => {
  const { wrapper } = setup()
  expect(wrapper.find('form').hasClass('loginpanel')).toBe(true)
})

test('it performs login successfully', async () => {
  const { wrapper, props: {history, mutate, onLogin, client: {resetStore}, history: {goBack}}} = setup()
  mutate.mockReturnValue(Promise.resolve({data: {login: {user: {email: "a@b.com"}, token: "xyzzy"}}}))
  const emailAndPassword = {email: "a@b.com", password: "xyzzy"}
  expect.assertions(5)
  const rejection = jest.fn()
  wrapper.instance().performLogin(emailAndPassword).then(result => {
    expect(result).toEqual("")
    expect(onLogin).toHaveBeenCalled()
    expect(resetStore).toHaveBeenCalled()
    expect(goBack).not.toHaveBeenCalled()
  }).catch(rejection)
  expect(rejection).not.toHaveBeenCalled()
})

test('it handles a failed login', async () => {
  const { wrapper, props: {mutate, onLogin, client: {resetStore}, history: {goBack}}} = setup()
  mutate.mockReturnValue(Promise.reject({message: 'GraphQL error: In field "login": barf!'}))
  const emailAndPassword = {email: "a@b.com", password: "xyzzy"}
  expect(wrapper.instance().performLogin(emailAndPassword)).resolves.toBe("barf!")
  expect(onLogin).not.toHaveBeenCalled()
  expect(resetStore).not.toHaveBeenCalled()
  expect(goBack).not.toHaveBeenCalled()
})
