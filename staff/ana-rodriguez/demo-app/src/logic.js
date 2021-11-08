function signUpCall(user,callback) {
    if (typeof user.name !== 'string') throw new TypeError(user.name + 'is not a string')
    if (!user.name.trim().length) throw new Error('Name is empty or blank')
    if (user.name.trim() !== user.name) throw new Error('blanck spaces around name')

    if (!user.username.trim().length) throw new Error('userName is empty or blank')
    if (typeof user.username !== 'string') throw new TypeError(user.username + 'is not a string')

    if (!user.password.trim().length) throw new Error('password is empty or blank')
    if (typeof user.password !== 'string') throw new TypeError(user.password + 'is not a string')
    if (/\r?\n|\r|\t| /g.test(user.password)) throw new Error('password has blank spaces')
    // if (/^(?=[^AZ]*[AZ])(?=[^az]*[az])(?=[^0-9]*[0-9]).{6,}$/g.test(user.password) === false) throw new Error('password needed uppercase, lowercase, number and 6 characters of length')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 409 || status === 400) {
            var response = JSON.parse(xhr.responseText)

            var message = response.error

            callback(new Error(message))
        } else if (status === 201) {
            callback(null)
        }

    }


    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const body = user
        

    xhr.send(JSON.stringify(body))
}

// En archivo logic implemento la lógica de negocio que significa todo lo que tenga que ver con la llamada al servidor
// En archivo main recojo los datos que necesito pasarle a mi lógica de negocio
// Y después en la callback implemento todo lo necesario para la navegación de la página web

// SIGN-IN
function signInCall(user, callback) {
    // if(!userName.length) throw new Error('User name is empty')
    if (!user.username.trim().length) throw new Error('userName is empty or blank')
    if (typeof user.username !== 'string') throw new TypeError(user.username + 'is not a string')

    // if(!password.length) throw new Error ('Password is empty')
    if (!user.password.trim().length) throw new Error('password is empty or blank')
    if (typeof user.password !== 'string') throw new TypeError(user.password + 'is not a string')
    if (/\r?\n|\r|\t| /g.test(user.password)) throw new Error('password has blank spaces')
    // if (/^(?=[^AZ]*[AZ])(?=[^az]*[az])(?=[^0-9]*[0-9]).{6,}$/g.test(password) === false) throw new Error('password needed uppercase, lowercase, number and 6 characters of length')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        var response = JSON.parse(xhr.responseText)
        var message = response.error


        if (status === 401) {
            callback(new Error(message))
        }
        else if (status === 200) {
            var token = response.token
            callback(null, token)
        }
    }
    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

   

    xhr.send(JSON.stringify(user))
}

function retrieveSignIn(token, callback) {
    if (!token) throw new Error('invalid token')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) {
            var response = JSON.parse(xhr.responseText)

            var message = response.error

            callback(new Error(message))
        } else if (status === 200) {
            var response = xhr.responseText

            var user = JSON.parse(response)

            callback(null, user)
        }

    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', 'Bearer ' + token)

    xhr.send()
}

// PROFILE//Change Password
function profileCall(oldPassword,newPassword, token, callback) {
    if (!oldPassword.length) throw new Error('oldpassword is empty')
    if (!newPassword.length) throw new Error('newpassword is empty')

    var xhr = new XMLHttpRequest
    var body = {
        oldPassword: oldPassword,
        password: newPassword
    }

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401) {
            var response = JSON.parse(xhr.responseText)

            var message = response.error

            callback(new Error(message))
        } else if (status === 204) {
            callback(null)
        }

    }
    xhr.open("PATCH", "https://b00tc4mp.herokuapp.com/api/v2/users");
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
}

// UNREGISTER

function UnregisterCall(password, token, callback) {
    if (!password.length) throw new Error('password is empty')
    if (!token) throw new Error('invalid token')

    var xhr = new XMLHttpRequest

    var body = {
        password: password
    }

    xhr.onload = function () {
        var status = xhr.status

        if (status === 401 || status === 400) {
            var response = JSON.parse(xhr.responseText)

            var message = response.error

            callback(new Error(message))
        } else if (status === 204) {
            callback(null)
        }

    }
    xhr.open('DELETE', 'https://b00tc4mp.herokuapp.com/api/v2/users')
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(body))
}

//   SEARCH
function searchVehicles(query, callback) {
    if (typeof query !== 'string') throw new TypeError(query + 'is not a string')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 200) {
            var vehicles = JSON.parse(xhr.responseText)

            callback(null, vehicles)
        }
    }

    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=' + query)

    xhr.send()
}


function retrieveVehicle(id, callback) {
    if (typeof id !== 'string') throw new TypeError(id + 'is not a string')

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        var status = xhr.status

        if (status === 200) {
            var vehicles = JSON.parse(xhr.responseText)

            callback(null, vehicles)
        }
    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/'+id)

    xhr.send()

}


export { 
    signUpCall,
    signInCall,
    retrieveSignIn,
    profileCall,
    UnregisterCall,
    searchVehicles,
    retrieveVehicle
}