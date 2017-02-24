const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Juice = require('../models/juice');

router
    .get('/', (req, res, next) => {
        Juice.find()
            .then(juices => res.send(juices))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Juice.findById(req.params.id)
            .populate('ingredients', 'name imgUrl description')
            .then(juice => res.send(juice))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        new Juice(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
        Juice.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .put('/:juiceId/ingredient/:ingredientId', (req, res, next) => {
        Juice.findById(req.params.juiceId)
            .then(juice => {
                if(juice.ingredients.indexOf(req.params.ingredientId) === -1) juice.ingredients.push(req.params.ingredientId);
                return juice; 
            })
            .then(juice => {
                return Juice.findByIdAndUpdate(req.params.juiceId, juice, {new: true});
            })
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Juice.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;