import React from 'react'
import PropTypes from 'prop-types'
import { render, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { withAuth } from '../../graphql/withAuth'

const Child = ({stuff}) => (<span>Dummy</span>)
Child.propTypes = {
  stuff: PropTypes.array.isRequired,
  other: PropTypes.bool.isRequired
}

const mockStore = (state={}) => {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state
  }
}

const rendered = (moreData, params={}, state={}) => {
  const WrappedChild = withAuth(params)(Child)
  const data = Object.assign({
    error: undefined,
    loading: false
  }, moreData)
  return render(
    <Provider store={mockStore(state)}>
      <Router>
        <WrappedChild data={data} other={true}/>
      </Router>
    </Provider>
  ).html()
}

test('it renders the component when not loading and no error', () => {
  expect(rendered({stuff: []})).toMatch(/Dummy/)
})

test('it renders when loading', () => {
  expect(rendered({loading: true})).toMatch(/loading/)
})

test('it renders when loading with a custom handler', () => {
  const custom = () => (<span>loaderino!</span>)
  expect(rendered({loading: true},
                  {onLoading: custom})).toMatch(/loaderino!/)
})

test('it renders when a non-auth error happens', () => {
  expect(rendered({error: { message: "hosed!"}})).toMatch(/Oops: hosed!/)
})

test('it renders with a custom handler when a non-auth error happens', () => {
  const custom = (err) => (<span>whoopsie: {err.message}!</span>)
  expect(rendered({error: { message: "busted!"}},
                  {onError: custom})).toMatch(/whoopsie: busted!/)
})

test('it redirects to /login when an auth error happens', () => {
  const WrappedChild = withAuth()(Child)
  const data = {users: [], loading: false, error: {graphQLErrors: [{code: "unauthorized"}]}}
  const wrapper = mount(
    <Router>
      <Provider store={mockStore()}>
        <WrappedChild data={data} />
      </Provider>
    </Router>
  )
  expect(wrapper.instance().history.location.pathname).toEqual("/login")
})

test('it redirects to a custom path when an auth error happens', () => {
  const WrappedChild = withAuth({unauthorizedPath: "/signin"})(Child)
  const data = {users: [], loading: false, error: {graphQLErrors: [{code: "unauthorized"}]}}
  const wrapper = mount(
    <Router>
      <Provider store={mockStore()}>
        <WrappedChild data={data} />
      </Provider>
    </Router>
  )
  expect(wrapper.instance().history.location.pathname).toEqual("/signin")
})
