const{readFile, writeFile} = require ('fs')


function modifyUser(id, data, callback) { // data => { name: ?, username: ?, password: ? }
    readFile('./users.json', 'utf8', (error,json)=>{ 

        if(error) return callback (error)

        const users = JSON.parse(json)

        const index = users.findIndex(element => element.id === id)

        const user = users[index]

        if(!user) return callback(new Error('no existe usuario con este id'))

        if(data.name !== '.') user.name = data.name
        if(data.username !== '.') user.username = data.username
        if(data.olpassword !== '.'){
            if(data.olpassword === user.password) user.password = data.newpassword
            else return callback (new Error ('credenciales incorrectas'))

        }
        users[index] = user

        const json2 = JSON.stringify(users, null, 4)

        writeFile('./users.json', json2, (error)=>{
            if(error) return callback(error)
            callback(null)
        })
        
    }
     

    )
}

module.exports = modifyUser