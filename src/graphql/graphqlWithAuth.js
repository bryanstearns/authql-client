import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { withAuth } from './withAuth'

const mapStateToProps = (state) => {
  return {
    viewer: state.auth.viewer
  }
}

export const graphqlWithAuth = (query, withAuthParams = {}) => {
  const result = compose(
    connect(mapStateToProps),
    graphql(query, {options: {notifyOnNetworkStatusChange: true}}),
    withAuth(withAuthParams)
  )
  return result
}
