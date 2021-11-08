import React, { Component } from 'react'
import { signUpCall } from '../logic'
import { signInCall } from '../logic'
import { retrieveSignIn } from '../logic'

import { UnregisterCall } from '../logic'
import { searchVehicles } from '../logic'
import { retrieveVehicle } from '../logic'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'

class App extends Component {
    constructor() {
        super()
        this.state = {
            view: 'landing'
        }
    }
    componentDidMount() {

    }
    onLanding = () => this.setState({ view: 'landing'})
    onRegister = () => this.setState({ view: 'register' })
    onLogin = () => this.setState({ view: 'login' })
    onHome = (user) => this.setState({ view: 'home', user: user})

    onPasswordUpdate = (oldPassword, newPassword) => {

    }


    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.onRegister} onLogin={this.onLogin} />}
            {this.state.view === 'register' && <Register onLogin={this.onLogin} />}
            {this.state.view === 'login' && <Login onHome={this.onHome}/>}
            {this.state.view === 'home' && <Home user={this.state.user} onLanding={this.onLanding} onProfile={this.onProfile}/>}
        </>
    }
}

export default App