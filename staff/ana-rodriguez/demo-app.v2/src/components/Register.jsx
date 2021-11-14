import { signUpCall } from "../logic"


function Register({ onLogin, setSpinner, onFeedback }) {


    return <>
        <form className="register containers-glass" onSubmit={event => {
            event.preventDefault()

            const user = {
                name: event.target.name.value,
                username: event.target.username.value,
                password: event.target.password.value
            }
            setSpinner(true)
            try {
                signUpCall(user, (error) => {
                    if (error) {
                        onFeedback({ level: 'error', message: error.message })
                        setSpinner(false)
                        return
                    }
                    onFeedback({ level: 'success', message: 'registro correcto'})
                    setSpinner(false)
                    onLogin()
                })

            } catch (error) {
                if (error) {
                    onFeedback({ level: 'error', message: error.message })
                    setSpinner(false)
                    return
                }
            }

        }}>
            <h1 className="form__title">Register</h1>
            <div className="grid-col">
                <div className="form__inputname">
                    <input className="form__input" type="text" placeholder="Name" id="name" />
                    <input className="form__input" type="text" placeholder="User name" id="username" required />
                    <input className="form__input" type="password" placeholder="Password" id="password" />
                </div>

                <div className="form__terms">
                    <input className="form__checkbox" type="checkbox" />
                    <label className="form__label">I accept the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a></label>

                </div>
                <div className="register__buttons">
                    <button className="button" type="submit"> Register</button>
                    <button className="button link" type="button" onClick={() => onLogin()}>Login</button>
                </div>
            </div>
        </form>
    </>
}

export default Register