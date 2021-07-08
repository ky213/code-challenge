import express from 'express'
import compression from 'compression' // compresses requests
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import { MONGODB_URI, PORT } from '../src/config' 

const app = express()

const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch(err => {
    console.log(
      `MongoDB connection error:  ${err}`
    )
    process.exit()
  })

// express config
app.set('port', PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

export default app
