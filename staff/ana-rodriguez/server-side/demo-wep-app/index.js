const express = require('express')
const bodyParser = require ('body-parser')
const formBodyParser = bodyParser.urlencoded({extended:false})

const server = express()
server.use(express.static('public'))
server.listen(8000, ()=>{
    console.log('ok')
} )
    
server.get('/register', (req,res)=> {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Register</title>
        <link rel ="stylesheet" href=2style.css>
    </head>
    <body>
        <h1>Register</h1>
        <f<orm method = "POST" action="/register>
        <input type ="text" name="name" placeholder="name">
        <input type="text" name="username" placeholder="username>
        <input type="password" name="password" placeholder="pasword">
        <button>Register</button>
    </body>
    </html>`)

})

const formBodyParser = bodyParser.urlencoded({extended:false})

server.post('/register', formBodyParser, (req,res)=>{
    const{body: {name,username,password}
}  =req

registerUser(name, username, password, 
    function (error){
    if(error) {
        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Rgister</title>

                <link rel="shortcut icon" href="favicon.webp" type="image/x-icon">
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <h1 class="titlle">Welcome</h1>
      
            </body>
            </html>`)
            
            return
    }


    res.send(``)
})
})