const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const logger = require('./module/logger');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cors = require('cors');

const app = express();


const { host, user, pass, database } = config.get('database');

console.log({ host, user, pass });

// "host": "vizsgaremek.8x1iy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
}).then(
    // require('./seed/seeder'), // Seed the database, ONLY ONCE MUST RUN
    () => {
    logger.info(`Mongodb connected to host ${host}/${database}`)
}).catch((err) => {
    logger.error(`Error connecting to mongo database: ${host}/${database}. Error is: ${err.message}`);
    process.exit();
});

// mongoose.connect(`mongodb+srv://${host}`, { user, pass})
//     .then(
//         // require('./seed/seeder'), // Seed the database, ONLY ONCE MUST RUN
//         conn => console.log('Connection success!'))
//     .catch(err => {
//         throw new Error(err.message);
//     });

// logger
app.use(morgan('combined', { stream: logger.stream }));

// cors
app.use(cors());

// Body parser
app.use(bodyParser.json());


app.use(express.static('public'));


app.use('/product', require('./controller/product/router'))

// app.use((req, res, next) => {
//     res.send(`<h1>Hello from Express!</h1>`);
// });


app.use((err, req, res, next) => {
    logger.error(`ERR ${err.statusCode}:${err.message}`)
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;