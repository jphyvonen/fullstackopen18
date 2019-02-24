const mongoose = require('mongoose')
const url = ''
mongoose.connect(url)
const inputData = {
    name: process.argv[2],
    number: process.argv[3]
}
const Person = mongoose.model('Person', {
    name: String,
    number: String
})
const person = new Person({
    name: inputData.name,
    number: inputData.number
})
if (inputData.name === undefined && inputData.number == undefined)
    FindAll()
else
    SavePerson()


const SavePerson = async () => {
    // person
    //     .save()
    //     .then(res => {
    //         console.log(`lisätään henkilö ${inputData.name} numero ${inputData.number} luetteloon`)
    //         mongoose.connection.close()
    //     })
    const saved = await person.save()
    console.log("tallennettu")
}
const FindAll = () => {
    Person
        .find({})
        .then(result => {
            console.log('Puhelinluettelo: ')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}
