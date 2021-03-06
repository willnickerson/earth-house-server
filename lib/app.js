const express = require('express');
const app = express();
const morgan = require('morgan');
const juices = require('./routes/juices');
const ingredients = require('./routes/ingredients');
const auth = require('./routes/auth');
const payments = require('./routes/payments');
const orders = require('./routes/orders');
const ordersPickup = require('./routes/orders-pickup');
const slides = require('./routes/slides');
const articles = require('./routes/articles');
const contact = require('./routes/contact');
const aboutArticles = require('./routes/about-articles');
const pickups = require('./routes/pickups');
const emails = require('./routes/emails');
const checkout = require('./routes/checkout-content');
const shop = require('./routes/shop-content');
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
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.static('./public'));

app.use('/api/auth', auth);
app.use('/api/juices', juices);
app.use('/api/ingredients', ingredients);
app.use('/api/orders', orders);
app.use('/api/orders-pickup', ordersPickup);
app.use('/api/payments', payments);
app.use('/api/slides', slides);
app.use('/api/articles', articles);
app.use('/api/about-articles', aboutArticles);
app.use('/api/pickups', pickups);
app.use('/api/contact', contact);
app.use('/api/emails', emails);
app.use('/api/checkout', checkout);
app.use('/api/shop', shop);


app.use(errorHandler);

module.exports = app;