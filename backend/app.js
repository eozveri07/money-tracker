const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const app = express()
const userRoutes = require('./routes/user');

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/user', userRoutes);
readdirSync('./routes').map((route) => {
    if (route !== 'auth.js') {
        app.use('/api/v1', require('./routes/' + route))
    }
})

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
