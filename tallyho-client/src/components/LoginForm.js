import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    };

    state = {
        error: null
    }

    handleSubmitJwtAuth = event => {
        event.preventDefault()
        this.setState({
            error: null
        })
        const { email, password } = event.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ' '
                password.value = ' '
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({
                    error: res.error
                })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form className='login-form' onSubmit={this.handleSubmitJwtAuth}>
                <div role='alert'>
                    {error && <p className='error'>{error}</p>}
                </div>
                <h2>Ready for a new day?</h2>
                <div className='email'>
                    <label htmlFor='LoginForm_email'>
                        Email
                    </label>
                    <input required id="email-field" type="text" ></input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm_password'>
                        Password
                    </label>
                    <input required id="password-field" type="text" ></input>
                </div>
                <button>Submit</button>
                <div className="sign-up-block">
                    <p>Need an Account?</p>
                    <p className="signup-link">
                        <Link to={`/signup`}>
                            Sign up!
                        </Link>
                    </p>
                </div>


            </form>
        )
    }
}