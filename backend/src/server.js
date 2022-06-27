const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const logger = require('./module/logger');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();


const { host, user, pass, database } = config.get('database');


mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
}).then(
    // require('./seed/seeder'), // Seeder - csak egyszer szabad futtatni
    // require('./seed/databaseconfig'), // Összetett objektumok szétszedése két kollekcióba
    () => {
    logger.info(`Mongodb connected to host ${host}/${database}`)
}).catch((err) => {
    logger.error(`Error connecting to mongo database: ${host}/${database}. Error is: ${err.message}`);
    process.exit();
});


// logger
app.use(morgan('combined', { stream: logger.stream }));

// cors
app.use(cors());

// Body parser
app.use(bodyParser.json());

app.use(express.static('public'));

const authencticateJwt = require('./model/auth/authenticate');

// router
app.use('/login', require('./controller/login/router'));

// A tesztek lefuttathatósága miatt nem lehet authentikáció.
// Az API éles használatakor az 53-57 sor ki kell kommentelni.
// És a 61-65 sortokat pedig kivenni a kikommentelésből.
app.use('/address', require('./controller/address/router'));
app.use('/customer', require('./controller/customer/router'))
app.use('/user', require('./controller/user/router'))
app.use('/category', require('./controller/category/router'));
app.use('/product', require('./controller/product/router'));

// -- authencticate -- 
//app.use('/address', authencticateJwt, require('./controller/address/router'));
// app.use('/customer', authencticateJwt, require('./controller/customer/router'))
// app.use('/user', authencticateJwt, require('./controller/user/router'))
// app.use('/category', authencticateJwt, require('./controller/category/router'))
// app.use('/product', authencticateJwt, require('./controller/product/router'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Atlasz adatbázis változtatásához - idegen kulcsok csatlakoztatása
// app.use('/mode', require('./controller/mode/router'))


app.use((err, req, res, next) => {
    logger.error(`ERR ${err.statusCode}:${err.message}`)
    res.status(err.statusCode || 500);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;