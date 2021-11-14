
function Unregister ({onUnregister, onBack}) {

return <div className="unregister">
    <form className="form-unregister" onSubmit={event =>{
        event.preventDefault()

        const {
            target:{
                password:{
                    value: password
                }
            }
        } = event
        
        onUnregister(password)
    }}>
        <input className="form__input" type="password" id="password" placeholder="password" />

        <div className="nav__buttons">
            <button className="button"onClick={event => {
            event.preventDefault()
            
            onBack()
            
        }}>Go Back </button>
        <button className="button"type="submit">Unregister</button>   
            </div> 
    </form>
</div>
}

export default Unregister