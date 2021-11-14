function signUpCall(user, callback) {
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
function profileCall(oldPassword, newPassword, token, callback) {
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
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/' + id)

    xhr.send()

}

// //FAV
function FavVehicle(id, token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    var xhr = new XMLHttpRequest

    xhr.onload = ()=> {
        const{status,responseText} = xhr
        

        if (status === 401 || status === 404) {
            const response =JSON.parse(responseText)

            const message = response.error
            
            callback(new Error(message))
        }
        else if (status === 200) {

            const response = responseText
            const user = JSON.parse(response)
            const { favs = [] } = user
            const index = favs.indexOf(id)

            if (index < 0)
                favs.push(id)
            else
                favs.splice(index, 1)

            const xhr2 = new XMLHttpRequest

            xhr2.onload = () => {
                const { status, responseText } = xhr2

                if (status === 400 || status === 401) {
                    const response = JSON.parse(responseText)
                    const message = response.error

                    callback(new Error(message))

                } else if (status === 204) {
                    callback(null)
                }
            }
            xhr2.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')

            xhr2.setRequestHeader('Authorization', `Bearer ${token}`)

            xhr2.setRequestHeader('Content-Type', 'application/json')

            const body = { favs }

            xhr2.send(JSON.stringify(body))
        }



    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()

}

// RETRIEVE FAV

function retrieveFav(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText } = xhr

        if (status === 401 || status === 404) {
            const response = JSON.parse(responseText)
            const message = response.error

            callback(new Error(message))
        } else if (status === 200) {
            const response = responseText
            const user = JSON.parse(response)
            const { favs = [] } = user

            if (favs.length) {
                let count = 0
                const vehicles = []

                favs.forEach((id) => {
                    const xhr2 = new XMLHttpRequest
                    xhr2.onload = () => {
                        const { status, responseText } = xhr2

                        if (status == 200) {
                            const vehicle = JSON.parse(responseText)

                            if (!vehicle) return callback(new Error(`no se encuentra el vehiculo ${id}`))

                            count++

                            vehicles.push(vehicle)

                            if (count === favs.length){
                                callback(null, vehicles)
                            }
                        }

                    }
                    xhr2.open('GET', `https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/${id}`)

                    xhr2.send()
                })
            } else callback(null, [])
        }
    }
    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}



// CARRITO

function addVehicleToCart(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText } = xhr

        if( status === 401 || status === 404) {
            const response = JSON.parse
            (responseText)

            const message = response.error

            callback(new Error(message))

        } else if(status === 200) {
            const response = responseText
            const user = JSON.parse(response)
            const { cart = [] } = user
            const item = cart.find(item => item.id === id)

            if (item)
            item.qty++
            
            else
             cart.push({ id, qty: 1})

            const xhr2 = new XMLHttpRequest

             xhr2.onload =() => {
                const { status,responseText} = xhr2

                
                if (status === 400 || status === 401) {
                    const response = JSON.parse(responseText)

                    const message = response.error

                    callback(new Error(message))
                } else if (status === 204) {
                    callback(null)
                }
             }


            xhr2.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')

            xhr2.setRequestHeader('Authorization', `Bearer ${token}`)

            xhr2.setRequestHeader('Content-Type', 'application/json')

            const body = { cart }

            xhr2.send(JSON.stringify(body))
        }
    }

    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
} 
    
function retrieveCartVehicles(token,callback){
if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

const xhr = new XMLHttpRequest

xhr.onload = () => {
    const { status, responseText } = xhr

    if (status === 401 || status === 404) {
        const response = JSON.parse(responseText)

        const message = response.error

        callback(new Error(message))
    } else if (status === 200) {
        const response = responseText

        const user = JSON.parse(response)

        const { cart = [] } = user

        if (cart.length) {
            let count = 0
            const vehicles = []

            cart.forEach((item, index) => {
                const { id, qty } = item

                const xhr2 = new XMLHttpRequest

                xhr2.onload = () => {
                    const { status, responseText } = xhr2

                    if (status === 200) {
                        const vehicle = JSON.parse(responseText)

                        if (!vehicle) return callback(new Error(`vehiculo no encontrado ${id}`))

                        vehicle.qty = qty

                        vehicles[index] = vehicle

                        count++

                        if (count === cart.length)
                            callback(null, vehicles)
                    }
                }

                xhr2.open('GET', `https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/${id}`)

                xhr2.send()
            })
        } else callback(null, [])
    }
}

xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

xhr.setRequestHeader('Authorization', `Bearer ${token}`)

xhr.send()

}

function removeVehicleFromCart(token, id, callback){
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText } = xhr

        if (status === 401 || status === 404) {
            const response = JSON.parse(responseText)

            const message = response.error

            callback(new Error(message))
        } else if (status === 200) {
            const response = responseText

            const user = JSON.parse(response)

            const { cart = [] } = user

            const index = cart.findIndex(item => item.id === id)

            if (index < 0)
                return callback(new Error(`no item with id ${id} in cart`))
            
            const item = cart[index]

            item.qty--

            if (item.qty === 0)
                cart.splice(index, 1)

            const xhr2 = new XMLHttpRequest

            xhr2.onload = () => {
                const { status, responseText } = xhr2

                if (status === 400 || status === 401) {
                    const response = JSON.parse(responseText)

                    const message = response.error

                    callback(new Error(message))
                } else if (status === 204) {
                    callback(null)
                }
            }

            xhr2.open('PATCH', 'https://b00tc4mp.herokuapp.com/api/v2/users')

            xhr2.setRequestHeader('Authorization', `Bearer ${token}`)

            xhr2.setRequestHeader('Content-Type', 'application/json')

            const body = { cart }

            xhr2.send(JSON.stringify(body))
        }
    }

    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}


export {
    signUpCall,
    signInCall,
    retrieveSignIn,
    profileCall,
    UnregisterCall,
    searchVehicles,
    retrieveVehicle,
    FavVehicle,
    retrieveFav,
    addVehicleToCart,
    retrieveCartVehicles,
    removeVehicleFromCart
}
    
