import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { networkOnlyFetchPolicy } from '../graphql/apolloClient'
import { Creators } from '../reducers/authReducer'

const logoutMutation = gql`
  mutation logout($token: String) {
    logout(token: $token) {
      token
    }
  }
`
export class Logout extends Component {
  componentDidMount() {
    if (this.props.token) {
      return this.props.mutate({variables: {token: this.props.token}})
             .catch((error) => undefined) // eat errors
             .then(() => {
               this.props.onLogout() // go discard the token
               this.props.client.resetStore() // discard authed version of data
               this.props.history.goBack() // redirect back to what invoked us
               return "" // no error
             })
    }
  }

  render() {
    return <span />
  }
}

Logout.propTypes = {
  client: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  token: PropTypes.string,
  history: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(Creators.logout())
})

export default compose(
  withApollo,
  graphql(logoutMutation, networkOnlyFetchPolicy),
  connect(mapStateToProps, mapDispatchToProps)
)(Logout)
