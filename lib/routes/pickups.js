const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Pickup = require('../models/pickup');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.show) query.show = req.query.show;
        Pickup.find(query)
            .then(pickups => res.send(pickups))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Pickup.findById(req.params.id)
            .then(pickup => res.send(pickup))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new Pickup(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Pickup.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', ensureAuth, (req, res, next) => {
        Pickup.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;