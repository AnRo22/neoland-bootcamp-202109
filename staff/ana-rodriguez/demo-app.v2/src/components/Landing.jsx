import React  from 'react'
function Landing ({onLogin, onRegister}){
   
    return <>
    <div className="landing containers-glass">
        <div className="landing__title">
            <h1>Welcome</h1>
        </div>
        <div className="landing__subtitle">
            <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed bibendum,
               
            </p>
        </div>
        <div className="landing__buttons">
            <button className="button" onClick = {()=> onLogin()}>Login</button>
            <button className="button" onClick = {()=> onRegister()}>Register</button>
        </div>

    </div>
    
     </>
}

export default Landing