const{readFile,writeFile} =require('fs')

function findUser(query,callback) {
    readFile('./user.json', 'utf8', (error,json)=>{
        if(error){
            callback(error)
        }else {
            const users = JSON.parse(json)
            const usersFound = users.filter((user)=> user.name.toLowerCase().includes(query.toLowerCase()) || user.username.toLowerCase().includes(query.toLowerCase()) || user.id.toLowerCase().includes(query.toLowerCase()))
            const response = usersFound.map((user) => {
                return {
                    name: user.name,
                    username: user.username
                }
            })
            callback(null, response)
        }
    })
}
module.exports = findUser
