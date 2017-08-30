import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

const isUnauthorizedError = (error) => {
  const gqlErrors = error.graphQLErrors || []
  return gqlErrors.some(e => (e.code === 'unauthorized'))
}

const defaultErrorContent = (error) => (
  <span className="error">Oops: {error.message}</span>
)

const defaultLoadingContent = () => (
  <span className="loading">(loading...)</span>
)

const wrapperMapStateToProps = (state, ownProps) => {
  return {
    error: ownProps.data.error,
    loading: ownProps.data.loading
  }
}

export const withAuth = (params={}) => {
  const errorHandler = params.onError || defaultErrorContent
  const loadingHandler = params.onLoading || defaultLoadingContent
  const unauthorizedPath = params.unauthorizedPath || "/login"
  return (WrappedComponent) => {
    const Wrapper = ({data, error, loading, ...otherProps}) => {
      const {error: _error, loading: _loading, ...otherDataProps} = data
      if (error) {
        if (isUnauthorizedError(error)) {
          return <Redirect push to={unauthorizedPath} />
        } else {
          return errorHandler(error)
        }
      }
      if (loading) {
        return loadingHandler()
      }
      return <WrappedComponent {...otherProps} {...otherDataProps}/>
    }
    Wrapper.propTypes = {
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object
      }).isRequired
    }
    return connect(wrapperMapStateToProps)(Wrapper)
  }
}
