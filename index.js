const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(bodyParser.json())

app.use(morgan('tiny'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "045-1236543" 
    },
    {
        id: 2,
        name: "Arto Järvinen",
        number: "041-21423123"

    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "040-4323234"
    },
    {
        id: 4,
        name: "Martti Tienari",
        number: "09-784232"

    }
]
app.get('/info', (req, res) => {
    const day = new Date()
    const maara = persons.length
    res.send(`<p>Puhelinluettelossa ${maara} on henkilön tiedot</p> <p>${day}</p>`)

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()

})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (body.number === undefined) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.random()*10000000000000000,
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)
    res.json(person)

})


const PORT = 3001
app.listen(PORT, () => {
    console.log('Sever running')
})