const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Slide = require('../models/slide');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        Slide.find()
            .then(slides => res.send(slides))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Slide.findById(req.params.id)
            .then(slide => res.send(slide))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new Slide(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Slide.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', ensureAuth, (req, res, next) => {
        Slide.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;