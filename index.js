import express from 'express'
import morgan from 'morgan'
const app = express()
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(
  [
    'Request details: :date :method :url :req[Content-Type] :body.',
    'Response: :status in :response-time ms'
  ].join('\n')
))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const phonebookInfo = `Phonebook has info for ${persons.length} people`
  response.send(`<!DOCTYPE html>

  <div>
  <p>${phonebookInfo}</p>
  <p>${new Date()}</p>
  </div>
  `)
})

app.get('/api/persons', (request, response) => [
  response.json(persons)
])

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(pp => pp.id === id)
  if (!person) {
    return response.status(400).json({ error: `couldn't find person with id ${request.params.id}` })
  }
  return response.json(person)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: `name or number missing` })
  }
  if (persons.find(pp => pp.name === body.name)) {
    return response.status(400).json({ error: `name ${body.name} already found` })
  }

  // randomly generate ID
  let id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  while (persons.find(pp => pp.id === id)) {
    id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(pp => pp.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
