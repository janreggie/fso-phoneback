import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './person.js'

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (request, _response) => JSON.stringify(request.body));
app.use(morgan(
  [
    'Request details: :date :method :url :req[Content-Type] :body.',
    'Response: :status in :response-time ms'
  ].join('\n')
))

app.get('/info', (_request, response) => {
  const phonebookInfo = `Phonebook has info for ${persons.length} people`
  response.send(`<!DOCTYPE html>

  <div>
  <p>${phonebookInfo}</p>
  <p>${new Date()}</p>
  </div>
  `)
})

app.get('/api/persons', (_request, response) => [

  Person.find({}).then(persons => response.json(persons))
])

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id)
  .then(person => {
    if (!person) {
      return response.status(404).json({error: 'could not find person with given id'})
    }
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {

  const body = request.body
  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (!body.name) {
    return response.status(400).json({ error: 'name not provided' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number not provided' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => response.json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {

  const id = request.params.id
  Person.findByIdAndDelete(id).then(_ => response.status(204).end())
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
