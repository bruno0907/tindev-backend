const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const server = express();

const PORT = process.env.PORT || 3333;
const DB = process.env.DB;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then( () => {
    console.log('Database connection success!')
}).catch( () => {
    console.error('Database connection failed!')
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(PORT, function() {
    console.log(`Server Running on ${this.address().port} port `);
});