const express = require('express');
const app = express();
const morgan = require('morgan');
const juices = require('./routes/juices');
const ingredients = require('./routes/ingredients');
const auth = require('./routes/auth');
const payments = require('./routes/payments');
const orders = require('./routes/orders');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if(req.header["x-forward-proto"] === 'https') next(); //eslint-disable-line
        else res.redirect(`http://${req.hostname}${req.url}`);
    });
}

app.use((req, res, next) => {
    console.log('setting cors headers');
    const url = '*';
    res.header('Access-Control-Allow-Origin', url);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('./public'));

app.use('/api/auth', auth);
app.use('/api/juices', juices);
app.use('/api/ingredients', ingredients);
app.use('/api/orders', orders);
app.use('/api/payments', payments);

app.use(errorHandler);

module.exports = app;