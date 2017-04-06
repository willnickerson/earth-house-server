const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();
const bodyParser = require('body-parser').json();


router
    .get('/', (req, res, next) => {
        Admin.find() 
            .then(data => res.send(data))
            .catch(next);
    })
    .post('/create-admin', bodyParser, (req, res, next) => {
        const { username, password } = req.body; //eslint-disable-line
        delete req.body.password;
        const admin = new Admin(req.body);
        admin.generateHash(password);
        admin.save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    .post('/signin', bodyParser, (req, res, next) => {
        const { username, password } = req.body;
        delete req.body.password;
        Admin.findOne({ username })
            .then(user => {
                if (!user || !user.compareHash(password)) {
                    throw({
                        code: 400,
                        error: 'Invalid username or password.'
                    });
                }
                return token.sign(user);
            })
            .then(profile => {
                res.send({ 
                    token: profile.token,
                    id: profile.payload.id,
                    username: profile.payload.username
                });
            })
            .catch(next);
    })
    .get('/verify', ensureAuth, (req, res) => {
        res.status(200).send({ success: true });
    });

module.exports = router;