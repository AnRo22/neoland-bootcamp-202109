
function Feedback({ level, message, onAccept }) {


  const className = `feedback__text ${level ? `feedback__text--${level}` : ''}`

  return <div className='feedback'>
    <div className="panel container">
      <p className={className}>{message}</p>
      <button className="button" onClick={onAccept}>Aceptar</button>
    </div>
  </div>

}

export default Feedback