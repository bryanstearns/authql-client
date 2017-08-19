import React from 'react'
import { mount } from 'enzyme'
import LoginPanel from '../../components/LoginPanel'

function setup() {
  const props = {
    onLogin: jest.fn()
  }
  const wrapper = mount(<LoginPanel {...props} />)

  const emailAndPassword = {email: "a@b.com", password: "xyzzy"}
  wrapper.setState({error: "", ...emailAndPassword})

  return {props, wrapper}
}

test('it renders the form', () => {
  const { wrapper } = setup()
  expect(wrapper.find("form").hasClass('loginpanel')).toBe(true)
  expect(wrapper.find("input[name='email']").length).toBe(1)
  expect(wrapper.find("input[name='password']").length).toBe(1)
  expect(wrapper.find("button[type='submit']").length).toBe(1)
})

test('it updates its state as the user edits', () => {
  const { wrapper } = setup()

  wrapper.find("input[name='email']")
         .simulate('change', {target: {value: 'new'}})
  expect(wrapper.state()).toEqual({"email": "new", "error": "", "password": "xyzzy"})

  wrapper.find("input[name='password']")
         .simulate('change', {target: {value: 'swordfish'}})
  expect(wrapper.state()).toEqual({"email": "new", "error": "", "password": "swordfish"})
})

test('it calls onLogin when the user clicks Log In with good info', () => {
  const emailAndPassword = {email: "a@b.com", password: "xyzzy"}
  const { wrapper, props } = setup()
  props.onLogin.mockReturnValue(Promise.resolve(""))

  expect(props.onLogin.mock.calls.length).toBe(0)
  wrapper.find("form").simulate('submit')
  expect(props.onLogin.mock.calls).toEqual([[emailAndPassword]])
  expect(wrapper.state().error).toEqual("")

})

test('it calls onLogin then displays the error when the user clicks Log In with bad info', async () => {
  expect.assertions(4);
  const emailAndPassword = {email: "a@b.com", password: "xyzzy"}
  const { wrapper, props } = setup()
  const errorPromise = Promise.resolve("errormsg")
  props.onLogin.mockReturnValue(errorPromise)

  wrapper.setState({error: "", ...emailAndPassword})
  expect(props.onLogin.mock.calls.length).toBe(0)
  wrapper.find("button").simulate('submit')
  await expect(errorPromise).resolves.toBe("errormsg")
  expect(props.onLogin.mock.calls).toEqual([[emailAndPassword]])
  expect(wrapper.state().error).toEqual("errormsg")
})
