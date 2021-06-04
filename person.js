import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

const url = process.env.MONGODB_URI
if (!url) {
  console.log(`please set environment variable MONGODB_URI`)
  process.exit(1)
}

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(
  _result => {
    console.log('logged in to phonebook database')
  },
  error => {
    console.log(`couldn't log in to phonebook: ${error}`)
    process.exit(2)
  }
)

export default Person