const{findUser} = require('./logic')

const {argv:[, , command], argv} = process

if (command === 'register') {
    
}

else if (command === 'unregister') {
    
} 

else if(command === 'retrieve'){

}

else if(command === 'find'){
    findUser(argv[3],(error,users)=>{
        if(error){
            console.log(error.message)
            
        }else{
            console.log(users)
        }
    
    })

}

else if(command === 'modify'){

}