import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import { networkOnlyFetchPolicy } from '../graphql/apolloClient'
import LoginPanel from '../components/LoginPanel'
import { Creators } from '../reducers/authReducer'

const loginMutation = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`
export class Login extends Component {
  constructor(props) {
    super(props)
    this.performLogin = this.performLogin.bind(this)
  }

  performLogin(variables) {
    const {client, onLogin} = this.props
    return this.props.mutate({variables})
           .then(({data: {login: {user: {email}, token}}}) => {
             client.resetStore() // discard un-authed version of data
             onLogin(email, token) // go record the token
             this.props.history.goBack() // redirect back to what invoked us
             return "" // no error
           })
           .catch((error) => (
             // Strip the GraphQL cruft from the error message
             error.message.replace("GraphQL error: In field \"login\": ", "")
           ))
  }

  render() {
    return (<LoginPanel onLogin={this.performLogin} />)
  }
}

Login.propTypes = {
  client: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, token) => dispatch(Creators.login(email, token))
  }
}

export default compose(
  withApollo,
  graphql(loginMutation, networkOnlyFetchPolicy),
  connect(undefined, mapDispatchToProps)
)(Login)
