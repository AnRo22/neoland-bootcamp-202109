function PostSignIn(props) {
    return <div className="post-signin container container--gapped container--vertical">
        <h1>Welcome! {props.user.name}</h1>
        <button className="button button--dark button--medium" onClick={() => props.onHome()}>Home</button>
    </div>
}