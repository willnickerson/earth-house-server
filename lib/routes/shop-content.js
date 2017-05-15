const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const shopContent = require('../models/shop-content');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        shopContent.find()
            .then(content => res.send(content))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        shopContent.findById(req.params.id)
            .then(content => res.send(content))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new shopContent(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        shopContent.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    });

module.exports = router;