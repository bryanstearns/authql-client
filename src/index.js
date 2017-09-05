import ourApolloClient from './graphql/apolloClient'
export const apolloClient = ourApolloClient

import ourLoginPanel from './components/LoginPanel'
export const LoginPanel = ourLoginPanel

import ourLogin from './containers/Login'
export const Login = ourLogin

import ourLogout from './containers/Logout'
export const Logout = ourLogout

import { withAuth as ourWithAuth } from './graphql/withAuth'
export const withAuth = ourWithAuth

import { graphqlWithAuth as ourGraphqlWithAuth } from './graphql/graphqlWithAuth'
export const graphqlWithAuth = ourGraphqlWithAuth

import { authReducer as ourAuthReducer,
         Types as ourAuthTypes,
         Creators as ourAuthCreators } from './reducers/authReducer'
export const authReducer = ourAuthReducer
export const AuthTypes = ourAuthTypes
export const AuthCreators = ourAuthCreators
