const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
})

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

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT, function() {
    console.log(`Server Running on ${this.address().port} port `);
});