import 'babel-polyfill'
import React from 'react'
import { mount } from 'enzyme'
import { createWaitForElement } from 'enzyme-wait'
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ApolloProvider, ApolloClient, gql } from 'react-apollo'
import { mockNetworkInterface } from 'react-apollo/test-utils'
import { graphqlWithAuth } from '../../graphql/graphqlWithAuth'

const mockStore = (state={}) => {
  return {
    mockStore: true,
    subscribe: () => undefined,
    dispatch: () => undefined,
    getState: () => state
  }
}

test('it does query stuff', async () => {
  const query = gql`query foo { bar }`
  const data = { bar: "baz" }
  const mocks = [{ request: {query}, result: {data}}]
  const networkInterface = mockNetworkInterface.apply(null, mocks)
  const client = new ApolloClient({networkInterface, addTypename: false})

  const Child = ({bar}) => (<span className="bar">{bar}</span>)
  const WrappedChild = graphqlWithAuth(query)(Child)
  const wrapper = mount(
    <Router>
      <ApolloProvider client={client} store={mockStore({auth: {viewer: "bob"}})}>
        <WrappedChild />
      </ApolloProvider>
    </Router>
  )

  const waitFor = createWaitForElement(".bar")
  await waitFor(wrapper)
  const tag = wrapper.find(".bar")
  expect(tag.text()).toEqual("baz")
})
