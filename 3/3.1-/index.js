

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
const getData = (req, res, next) => {

    req.data = JSON.stringify(req.body)
    next()
}

app.use(getData)
morgan.token('data', (req) => {
    return req.data
})

app.use(morgan(':method :url :data :response-time'))
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/', async (req, res) => {
    // Person
    //     .find({})
    //     .then(persons => {
    //         res.json(persons.map(Person.format))
    //     })
    const persons = await Person.find({})
    // console.log(persons)
    res.json(persons.map(Person.format))
})

app.get('/info', (req, res) => {
    const date = new Date()
    Person
        .count({})
        .then(count => {
            res.send(`Puhelinluettelossa on ${count} henkilön tiedot` + '<br>' + `${date}`)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            res.json(Person.format(person))
        })
})
app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(x => {
            res.status(204).end()
        })
})
app.put('/api/persons/:id', (req, res) => {
    console.log("backki req", req.params)
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(x => {
            res.json(Person.format(x))
        })
})

app.post('/api/persons/', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined)
        return res.status(400).json({ error: 'Number or name empty' })
    // if (duplicateName.length != 0)
    // return res.status(400).json({ error: 'Name already found' })

    const person = new Person({
        name: body.name,
        number: body.number
    })
    Person
        .find({ name: body.name })
        .then(result => {
            console.log(result)
            if (result.length !== 0)
                return res.status(400).json({ error: 'Name already found' })
            else
                person.save().then(x => res.json(Person.format(x)))
        })

})

var date = new Date()
var hours = date.getHours()
var minutes = date.getMinutes()
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`${hours} : ${minutes}`)
})