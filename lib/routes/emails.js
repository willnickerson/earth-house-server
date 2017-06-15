const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Email = require('../models/email');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', ensureAuth, (req, res, next) => {
        Email.find()
            .then(emails => res.send(emails))
            .catch(next);
    })
    .get('/:id', ensureAuth, (req, res, next) => {
        Email.findById(req.params.id)
            .then(email => res.send(email))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        const email = req.body.email;
        Email.find({ email })
            .count()
            .then(count => {
                if(count > 0) throw {
                    code: 400,
                    error: `${email} already on email list!`
                };
                return new Email(req.body).save();
            })
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Email.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', ensureAuth, (req, res, next) => {
        Email.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;