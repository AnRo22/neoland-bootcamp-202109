import { useState } from "react"
import Unregister from'./Unregister'

function Profile ({onPasswordUpdate, onBack, onUnregister}) {
    const [view,setView] = useState('update_password')
    const goToUnregister = () => setView('unregister')
    const goToUpdatePassword = () => setView('update_password')

   
        return <>
            {view === 'update_password' && <div className="profile containers">
                <form className="container" onSubmit={event => {
                    event.preventDefault()

                    const { target: { oldPassword: { value: oldPassword }, newPassword: { value: newPassword } } } = event

                    onPasswordUpdate(oldPassword, newPassword)
                }}>
                    <div className="changepass" >
                        <input className="form__input" name='oldPassword' type="password" placeholder="oldPassword" id="oldPassword" />
                        <input className="form__input" name='newPassword' type="password" placeholder="newPassword" id="newPassword" />
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

            {view === 'unregister' &&
             <Unregister onBack={goToUpdatePassword}
             onUnregister={onUnregister} />}
        </>
    }


export default Profile