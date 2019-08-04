const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const { routeError, psqlError, serverError, customError } = require('./errors/errors')


app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeError)

app.use(psqlError);

app.use(customError);

app.use(serverError);



module.exports = app;