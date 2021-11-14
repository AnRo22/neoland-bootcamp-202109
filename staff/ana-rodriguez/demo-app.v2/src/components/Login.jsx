import { retrieveSignIn, signInCall } from "../logic";

function Login ({onHome, setSpinner, onRegister, onFeedback}) {
    return <>
    <form className="login containers-glass" onSubmit={ event => {
        event.preventDefault()

        const user = {
            username : event.target.username.value,
            password : event.target.password.value
        }
        setSpinner(true)
        try{
            signInCall(user,(error,token)=>{
                if (error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                    return 
                }
                sessionStorage.setItem('token',token)

                try{
                    retrieveSignIn(token,(error,user)=>{
                        if (error) {
                            onFeedback({level:'error', message:error.message})
                            setSpinner(false)
                            return 
                        }

                        onFeedback({level:'success', message:'Inicio de sesión correcto'})

                        onHome(user)
                        setSpinner(false)
                    })
                } catch(error){
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                }
            })
        } catch(error){
            onFeedback({level:'error', message:error.message})
            setSpinner(false)
        }
    }}>

        <div className="Login__tittle">
            <h1>Login</h1>
        </div>    
            <div className="login__subtittle"> 
                <p>Inicia sesión</p> 
            </div>
           
            
        <div className="Login__inputs">
            <input className="form__input" type="text" name="username" placeholder="username" id="username" />
            <input className="form__input" type="password" name="password" placeholder="password" id="password" />
        </div>
        <div className="button__login">
            <button className="button" type="submit">Login</button>
            <button className="button" type="button" onClick={()=> onRegister()}>Register</button>
        </div>
    </form>
    
    </>

}

export default Login