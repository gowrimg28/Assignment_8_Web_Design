require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db  = mongoose.connection
db.on('error', (error) => console.error(error)) 
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const userRouter = require('./routes/user')
app.use('/user', userRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
