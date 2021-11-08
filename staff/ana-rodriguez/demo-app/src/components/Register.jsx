import { signUpCall } from "../logic"

function Register (props) {
    return <>
    <form className="register containers"onSubmit = {event => {
        event.preventDefault()

        const user = { 
            name : event.target.name.value,
            username : event.target.username.value,
            password : event.target.password.value
        }
        try{
            signUpCall(user,(error)=>{
                if (error) return alert(error.message) 
            
                alert('registro correcto')
                
                props.onLogin() 
        })

        } catch(error){
            alert(error.message)
        }
        
    }}>
        <h1 className="form__title">Register</h1>
        <p className="form__subtitle">Lorem ipsum dolor sit amet.</p>
        <div className="grid-col">
            <div className="form__inputname">
                <input className="form__input" type="text" placeholder="Name" id = "name"/>
                <input className="form__input" type="text" placeholder="User name"id ="username" required/>
            <input className="form__input" type="password" placeholder="Password" id ="password"/>
            </div>
        
            <div className="form__terms">
                <input className="form__checkbox" type="checkbox"/><label class="form__label" for="">I accept the <a
                        href="#">Terms of Use</a> & <a href="#">Privacy Policy</a></label>
    
            </div>
            <div className="register__buttons">
                <button className="button"> Register</button>
                <button className="button link">Login</button>
            </div>
        </div>
    </form>
    </>
}

export default Register