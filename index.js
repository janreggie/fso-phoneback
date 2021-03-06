import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './person.js'

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (request, _response) => JSON.stringify(request.body))
app.use(morgan(
  [
    'Request details: :date :method :url :req[Content-Type] :body.',
    'Response: :status in :response-time ms'
  ].join('\n')
))

app.get('/info', (_request, response) => {

  Person.find({})
    .then(persons => {
      const phonebookInfo = `Phonebook has info for ${persons.length} people`
      return response.send(`<!DOCTYPE html>
    <div>
    <p>${phonebookInfo}</p>
    <p>${new Date()}</p>
    </div>
    `)
    })
})

app.get('/api/persons', (_request, response) => [

  Person.find({}).then(persons => response.json(persons))
])

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).json({ error: 'could not find person with given id' })
      }
      return response.json(person)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  Person.create({ name: body.name, number: body.number })
    .then(createdPerson => createdPerson.save())
    .then(savedPerson => savedPerson.toJSON())
    .then(formattedPerson => response.json(formattedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body
  if (!body) {
    return response.status(400).json({ error: 'content missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number not provided' })
  }

  Person.findByIdAndUpdate(request.params.id, { number: body.number }, { new: true, runValidators: true })
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(_ => response.status(204).end())
    .catch(error => next(error))
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
