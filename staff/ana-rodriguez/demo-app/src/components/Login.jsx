import { retrieveSignIn, signInCall } from "../logic";

function Login (props) {
    return <>
    <form className="login" onSubmit={ event => {
        event.preventDefault()

        const user = {
            username : event.target.username.value,
            password : event.target.password.value
        }
        try{
            signInCall(user,(error,token)=>{
                if (error) return alert(error.message)

                try{
                    retrieveSignIn(token,(error)=>{
                        if (error) return alert(error.message)
                        
                        sessionStorage.setItem('token',token)
                        alert('inicio de sesión correcto')
                        props.onHome(user)
                    })
                } catch(error){
                    alert(error.message)
                }
            })
        } catch(error){
            alert(error.message)
        }
    }}>

        <div className="Login__tittle">
            <h1>Login</h1>
            <h2>Inicia sesión</h2>
            
        </div>
        <div className="Login__imputs">
            <input className="user" type="text" name="username" placeholder="username" id="username" />
            <input className="password" type="password" name="password" placeholder="password" id="password" />
        </div>
        <div className="button__login">
            <button className="button">Login</button>
            <button className="button">Register</button>
        </div>
    </form>
    
    </>

}

export default Login