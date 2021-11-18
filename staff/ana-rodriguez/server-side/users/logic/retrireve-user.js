const{readFile, writeFile} = require('fs')

function retrieveUser(id, callback) {
    readFile('./users.json', 'utf8', (error,json)=> {
        if(error) return callback(error)

        const users = JSON.parse(json)

        const user = users.find(user => user.id === id)

        if (!user) return callback('no se ha encontrado usuario con este id')

        delete user.id

        delete user.password

        callback(null, user)
            
        
    })
}

module.exports = retrieveUser