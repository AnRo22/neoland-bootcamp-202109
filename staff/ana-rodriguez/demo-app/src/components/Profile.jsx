import { Component } from "react"

class Profile extends Component {
    constructor() {
        super()
        this.state = { view: 'update_password' }
    }

    goToUnregister = () => this.setState({ view: 'unregister' })

    render() {
        const {
            props: {
                onPasswordUpdate,
                onBack,
                onUnregister
            },
            state: { view },
            goToUnregister
        } = this

        return <>
            {view === 'update_password' && <div className="profile">
                <form className="container" onSubmit={event => {
                    event.preventDefault()

                    const { target: { oldPassword: { value: oldPassword }, newPassword: { value: newPassword } } } = event

                    onPasswordUpdate(oldPassword, newPassword)
                }}>
                    <div className="changepass" >
                        <input className="change-pass" name='oldPassword' type="password" placeholder="oldPassword" id="oldPassword" />
                        <input className="change-repass" name='newPassword' type="password" placeholder="newPassword" id="newPassword" />
                    </div>
                    <div className="change">
                        <button className="Update button" type="submit">Update</button>
                        <button className="Unregister button" onClick={goToUnregister}>Unregister</button>
                        <button className="Goback button" onClick={event => {
                            event.preventDefault()
                            onBack()
                        }}>Go back</button>
                    </div>
                </form>
            </div>}
        </>
    }
}

export default Profile