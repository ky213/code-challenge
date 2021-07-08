import express from 'express'
import compression from 'compression' // compresses requests
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

import * as textController from '../src/controllers/textController'
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
  .then(() => {
    console.log(`Connected to database.`)
  })
  .catch(err => {
    console.log(`MongoDB connection error:  ${err}`)
    process.exit()
  })

// express config
app.set('port', PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

// API
app.get('/text', textController.getAllTexts)
app.get('/text/:texId', textController.getTextById)
app.post('/text', textController.storeText)
app.put('/text', textController.updateText)
app.get('/text/:textId/count', textController.getWordsCount)
app.get('/text/:textId/count/:language', textController.getWordsCount)
app.get('/text/search?=q', textController.searchText)
app.get('/text/mostOccurrent', textController.mostOccurrent)

export default app
