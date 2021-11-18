const fs = require('fs')
const { readFile, writeFile } = fs

const { argv: [, , command] } = process // Lo que antes era document ""

if (command === 'list') // $ node agenda.js list
    readFile('contacts.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error)

            return
        }

        const contacts = JSON.parse(json)

        contacts.forEach(({ name, phone, email }) => console.log(name, phone, email))
    })
else if (command === 'save') // $ node agenda.js save Mario 456456456 mario@mail.com
    readFile('agenda.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error.message)

            return
        }

        const contacts = JSON.parse(json)

        const { argv: [, , , name, phone, email] } = process

        contacts.push({ name, phone, email })

        const json2 = JSON.stringify(contacts, null, 4)
    
        writeFile('./agenda.json', json2, error => {
            if (error) {
                console.error(error.message)

                return
            }
        })
    })
// else if (command === 'find') // $ node agenda.js find peter
// readFile('contacts.json','utf8', (error,json) => {
//     if(error){
//         console.error(error.message)
//         return
//     }
//     const contacts = JSON.parse(json)

//      contacts.find(({name, phone, email})=>console.log(name,phone,email))
//      console.log("Empieza", contacts.find(({name}) => name.toLowerCase() === argv4))
// })

// También otra lógica
else if (command === 'find')// $ node agenda.js find peter
readFile('contacts.json','utf8', (error,json) => {
    if(error)return
        console.error(error.message)
        

        const contact = JSON.parse(json)
        let {arg:[, , , query]} = process
        
        query = query.toLowerCase()

        const results = contacts.filter(({name, phone, email})=>
         name.toLowerCase().includes(query) ||
         phone.toLowerCase().includes(query) || 
         email.toLowerCase().includes(query))

         console.log('ID NAME PHONE E-MAIL')

         results.forEach(({id,name,phone,email})=>console.log
         (id,name,phone,email))

})



else if(command==='splice')// $ node agenda.js remove 3
readFile('contacts.json', 'utf8', (error,json)=>{
    if(error){
        console.error(error)

        return
    }
    const{argv: [, , , remove]} = process
    const contacts = JSON.parse(json)

    console.log('id name phone email')

    contacts.splice(remove,1)
    console.log(contacts)
    const json2 = JSON.stringify(contacts, null, 4)
    writeFile('./agenda.json', json2, error => {
        if (error) {
            console.error(error.message)

            return
        }
    })
    
})

else if (command ==='remove') {
    const start = date.now()

    readFile ('.contacts.json', 'utf8', (error))
}



else if (command === 'modify') // $ node agenda.js modify 4 * * peter3@mail.com
    readFile('agenda.json', 'utf8', (error, json) => {
        if (error) {
            console.error(error.message)
            return
        }

        const contacts = JSON.parse(json)
        
        const { argv: [, , , userId, newName, newPhone, newEmail] } = process

        const contact = contacts.filter( ({id}) => id === userId)
        
      
        if (contact.length < 1) console.log(`User with id ${userId} don't exists`)
        else {
                const {id, name, phone, email} = contact[0]
                const newContact = {
                 id: id,
                 name: (newName === "*" || !newName) ? name : newName ,
                 phone: (newPhone === "*" || !newPhone) ? phone : newPhone,
                 email: (newEmail === "*" || !newEmail) ? email : newEmail              
            }
            contacts.forEach((contact, index) => {
                if(contact.id === id) contacts[index] = newContact
            })
            const json2 = JSON.stringify(contacts, null, 4)

            writeFile('./agenda.json', json2, (error, json) => {
                if (error) {
                    console.error(error.message)
                    return
                }
            })
        }
    })


else if ( command === 'filter') //node agenda.js remove gmail
readFile('agenda.json', 'utf8', (error,json)=> {
    if(error){
        console.error(error.message)
        return
    }
    const contacts = JSON.parse(json)
    const { argv: [, , , gmail] } = process

    console.log(contacts.filter(({email})=>email.includes(gmail)))
})

