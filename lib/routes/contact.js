const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Contact = require('../models/contact');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        Contact.find()
            .then(contacts => res.send(contacts))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Contact.findById(req.params.id)
            .then(contact => res.send(contact))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new Contact(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    });
    // .delete('/:id', ensureAuth, (req, res, next) => {
    //     Contact.findByIdAndRemove(req.params.id)
    //         .then(deleted => res.send(deleted))
    //         .catch(next);
    // });

module.exports = router;