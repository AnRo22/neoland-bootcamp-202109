import { useState, useEffect } from 'react'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Spinner from './Spinner'
import Feedback from "./Feedback";

function App() {

    const [view, setView] = useState('landing')
    const [user, setUser] = useState(null)
    const [spinner, setSpinner] = useState()
    const [showfeedback, setShowFeedback] = useState(false)
    const [feedbackMsg, setFeedbackMsg] = useState(null)
    const [feedbackLevel, setFeedbackLevel] = useState(null)

    const goToLanding = () => setView('landing')
    const goToRegister = () => setView('register')
    const goToLogin = () => setView('login')
    const goToHome = (user) => {
        setUser(user)
        setView('home')
    }
    const goToProfile = () => setView('profile')
    const onFeedback = (params) => {
        setShowFeedback(!showfeedback)
        setFeedbackMsg(params.message)
        setFeedbackLevel(params.level)
    }
    const onFeedbackAccept = () => setShowFeedback(!showfeedback)
    
    return <>
        {showfeedback && <Feedback level={feedbackLevel} message={feedbackMsg} onAccept={onFeedbackAccept}/>}
        {view === 'landing' && <Landing onRegister={goToRegister} onLogin={goToLogin} />}
        {view === 'register' && <Register onLogin={goToLogin} setSpinner={setSpinner} onFeedback={onFeedback} />}
        {view === 'login' && <Login onHome={goToHome} onRegister={goToRegister} setSpinner={setSpinner} onFeedback={onFeedback} />}
        {view === 'home' && <Home user={user} onLanding={goToLanding} onProfile={goToProfile} setSpinner={setSpinner} onFeedback={onFeedback} />}
        {spinner && <Spinner />}
    </>

}

export default App