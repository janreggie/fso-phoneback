import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// addToPhonebook adds an entry to the phonebook
//
const addToPhonebook = async (name, number) => {

  const person = new Person({
    name: name,
    number: number
  })
  return person
    .save()
    .then(_result => console.log(`added ${name} number ${number} to phonebook`),
          error => console.log(`couldn't add ${name} number ${number}: ${error}`))
}

// displayAll displays all names and entries in a given phonebook
//
const displayAll = async () => {

  return Person
    .find({})
    .then(result => {
            console.log('phonebook:')
            result.forEach(person => console.log(`${person.name} ${person.number}`))
          },
          error => console.log(`couldn't print out entries in phonebook: ${error}`))
}

const argv = process.argv
if (argv.length < 3) {
  console.log('requires password: node mongo.js <password>')
  process.exit(1)
}
if (argv.length !== 3 && argv.length !== 5) {
  console.log(`unexpected number of arguments: expects 3 or 5, got ${argv.length}`)
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstackopen.j6igy.mongodb.net/phonebook?retryWrites=true&w=majority`
await mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(
  _result => {
    console.log('logged in to phonebook')
  },
  error => {
    console.log(`couldn't log in to phonebook: ${error}`)
    process.exit(2)
  }
)

if (argv.length === 3) {
  await displayAll()
} else if (argv.length === 5) {
  await addToPhonebook(argv[3], argv[4])
}
mongoose.disconnect()
