const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Ingredient = require('../models/ingredient');

router
    .get('/', (req, res, next) => {
        Ingredient.find()
            .then(ingredients => res.send(ingredients))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Ingredient.findById(req.params.id)
            .then(ingredient => res.send(ingredient))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Ingredient(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
        Ingredient.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Ingredient.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;