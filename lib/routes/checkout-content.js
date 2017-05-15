const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Checkout = require('../models/checkout-content');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        Checkout.find()
            .then(data => res.send(data))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Checkout.findById(req.params.id)
            .then(checkout => res.send(checkout))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new Checkout(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Checkout.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    });

module.exports = router;