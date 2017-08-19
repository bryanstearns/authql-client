import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { tokenKey } from '../reducers/authReducer'

const uri = "http://localhost:4000/api"
const networkInterface = createNetworkInterface({uri})
networkInterface.use([{
  applyMiddleware(req, next) {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      req.options.headers.authorization = `Bearer ${token}`;
    }

    next();
  }
}])

export const networkOnlyFetchPolicy = {
  options: {
    fetchPolicy: 'network-only'
  }
}

export default new ApolloClient({networkInterface})
