const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const bodyParser = require('body-parser').json();

router
    //maybe add in a query object so that we can filter the order by completed and not
    .get('/', (req, res, next) => {
        Order.find()
            .then(orders => res.send(orders))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Order.findById(req.params.id)
            .then(order => res.send(order))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Order(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;