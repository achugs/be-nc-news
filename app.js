const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const { routeError, psqlError, serverError, customError, methodErrors } = require('./errors/errors')


app.use(express.json());

app.use('/api', apiRouter).all(methodErrors);

app.all('/*', routeError)

app.use(psqlError);

app.use(customError);

app.use(serverError);



module.exports = app;