const express = require('express')
const PORT = process.env.PORT || 8080
const cors = require('cors')

const personRouter = require('../routers/person.router')
const carRouter = require('../routers/car.router')
const sellRouter = require('../routers/sell.router')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', personRouter)
app.use('/api', carRouter)
app.use('/api', sellRouter)

app.listen(PORT, () => console.log(`Starting server on PORT:${PORT}`))
