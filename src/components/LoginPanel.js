import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LoginPanel.css'

class LoginPanel extends Component {
  static initialState = {
    email: "",
    password: "swordfish",
    error: ""
  }

  constructor(props) {
    super(props)
    this.state = LoginPanel.initialState
    this.doLogin = this.doLogin.bind(this)
  }

  valueChanged(updates) {
    this.setState(prevState => Object.assign(prevState, updates))
  }

  async doLogin(event) {
    event.preventDefault()
    event.stopPropagation()
    const {error, ...emailAndPassword} = this.state
    const newError = await this.props.onLogin(emailAndPassword)
    if (newError !== "") {
      this.setState({error: newError, ...emailAndPassword})
    }
  }

  componentDidMount() {
    this.emailInput.focus()
  }

  render() {
    const {email, password, error} = this.state
    return (
      <form className="loginpanel" onSubmit={this.doLogin}>
        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input type="text" name="email" defaultValue={email}
               ref={(input) => { this.emailInput = input; }}
               onChange={({target: {value}}) => this.valueChanged({email: value})} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" defaultValue={password}
               onChange={({target: {value}}) => this.valueChanged({password: value})} />

        <button type="submit">Sign in</button>
      </form>
    )
  }
}

LoginPanel.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginPanel
