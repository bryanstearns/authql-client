import React from 'react'
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

export const withAuth = (params={}) => {
  const errorHandler = params.onError || defaultErrorContent
  const loadingHandler = params.onLoading || defaultLoadingContent
  const unauthorizedPath = params.unauthorizedPath || "/login"
  return (WrappedComponent) => {
    const wrapper = ({data: {error, loading, ...otherDataProps}, ...otherProps}) => {
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

    wrapper.propTypes = {
      data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object
      }).isRequired
    }

    return wrapper
  }
}
