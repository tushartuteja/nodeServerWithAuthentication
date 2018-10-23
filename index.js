const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./router');

mongoose.connect('mongodb://localhost:27017/auth');
// app set up

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser());

router(app);

// server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port: ', port);
