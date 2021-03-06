require('./plugins/env')
require('./plugins/db')

const express = require('express')
const errorHandler = require('./helpers/error-handler')
const bodyParser = require('body-parser')
const api = require('./api')
const myMorgan = require('./plugins/morgan')
const cors = require('cors')
const myPassport = require('./plugins/passport')

// express app
const app = express()
// cors
app.use(cors())
app.options('*', cors())
// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// morgan
myMorgan(app)
// Passport
myPassport.initialize(app)

app.get('/', (req, res) => {
    res.json({
        msg: 'pro manager app'
    })
})

// API
app.use('/api/v1', api())

// Error handling
app.use(errorHandler)

process.on('unhandledRejection', (reason, p) => {
    // application specific logging, throwing an error, or other logic here
    throw ('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
// Run server
const port = process.env.PORT || 3000
app.set('port', port)
// kill $(lsof -t -i:3000) : use to kill if EADDR:3000

app.listen(port, () => console.log(`Running on localhost:${port}`))
