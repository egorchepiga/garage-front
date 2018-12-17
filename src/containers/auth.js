import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../components/button'
import '../styles/datagrip.css'
import 'react-widgets/dist/css/react-widgets.css';
import {login, exit, editLogin, editPassword} from "../store/containers/auth/action";


class Auth extends Component {

    constructor(props) {
        super(props);
    }

    signIn = () => {
        this.props.login(this.props.store.auth.login, this.props.store.auth.password)
    };

    editLogin = (event) => {
        this.props.editLogin(event.target.value)
    };

    editPassword = (event) => {
        this.props.editPassword(event.target.value)
    };

    render() {
        return (
            <div>
                <div>
                    <input disabled={this.props.store.auth.auth} value={this.props.store.auth.login} onChange={this.editLogin} placeholder={"login"} />
                    {!this.props.store.auth.auth && <input value={this.props.store.auth.password} onChange={this.editPassword} placeholder={"password"} /> }
                </div>
                <div>
                    {!this.props.store.auth.auth && <Button textLabel={true} onClick={this.signIn} label={"login"}/>}
                    { this.props.store.auth.auth && <Button textLabel={true} onClick={this.props.exit} label={"exit"}/>}
                </div>
            </div>
        )
    }

}

export default connect(state => ({
        store: state
    }), dispatch => ({
    login : (username, password) => {
        dispatch(login(username, password))
    },
    exit : () => {
        dispatch(exit())
    },
    editLogin : (login) => {
        dispatch(editLogin(login))
    },
    editPassword : (password) => {
        dispatch(editPassword(password))
    }
    })
)(Auth)