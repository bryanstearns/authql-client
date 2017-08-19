import React from 'react'
import { mount } from 'enzyme'
import { Logout } from '../../containers/Logout'

test('it logs out on mount', () => {
  const props = {
    client: {resetStore: jest.fn()},
    history: {goBack: jest.fn()},
    onLogout: jest.fn(),
    token: "xyzzy",
    mutate: (params) => {
      // Couldn't figure out how to mock the promise for real,
      // so mock it synchronously.
      expect(params).toEqual({variables: {token: props.token}})
      return {
        catch: (thenFn) => {
          return { then: (thenFn) => thenFn() }
        }
      }
    }
  }

  const wrapper = mount(<Logout {...props} />)
  expect(props.client.resetStore).toHaveBeenCalled()
  expect(props.history.goBack).toHaveBeenCalled()
  expect(props.onLogout).toHaveBeenCalled()
})
