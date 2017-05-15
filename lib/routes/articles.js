const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Article = require('../models/article');
const ensureAuth = require('../auth/ensure-auth')();

router
    .get('/', (req, res, next) => {
        Article.find()
            .then(articles => res.send(articles))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Article.findById(req.params.id)
            .then(article => res.send(article))
            .catch(next);
    })
    .post('/', ensureAuth, bodyParser, (req, res, next) => {
        new Article(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', ensureAuth, (req, res, next) => {
        Article.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;