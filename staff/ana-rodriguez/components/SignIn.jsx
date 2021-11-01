function SignIn(props) {   

    return <form className="singin conatiner conatiner --vertical container--gapped" onSubmit={ event => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        props.onSignIn(username, password,function(error,token){})


    }}>
        <input className="field" type="text" name="username" id="username" placeholder="username" />
        <input className="field" type="password" name="password" id="password" placeholder="password" />

        <div className="container">
            <button className="button button--medium">Sign In</button>
            <button className="button button--medium button--dark">Sign up</button>
        </div>
    </form>
}



      
          
      

