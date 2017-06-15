const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();
const bodyParser = require('body-parser').json();
const adminName = process.env.ADMIN_NAME;


router
    .get('/', ensureAuth, (req, res, next) => {
        Admin.find() 
            .then(data => res.send(data))
            .catch(next);
    })
    .post('/create-admin', bodyParser, (req, res, next) => {
        const { username, password } = req.body; //eslint-disable-line
        console.log(username, adminName);
        delete req.body.password;
        Admin.find({ username })
            .count()
            .then(count => {
                if(count > 0 || username !== process.env.ADMIN_NAME) throw {
                    code: 400,
                    error: `${username} not valid`
                };
                const admin = new Admin(req.body);
                admin.generateHash(password);
                return admin.save();
            })
            .then(saved => res.send(saved))
            .catch(next);
    })
    .post('/signin', bodyParser, (req, res, next) => {
        const { username, password } = req.body;
        delete req.body.password;
        Admin.findOne({ username })
            .then(user => {
                if (!user || !user.compareHash(password) || username !== process.env.ADMIN_NAME) {
                    throw({
                        code: 400,
                        message: 'Invalid username or password.'
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
    .delete('/:id', ensureAuth, (req, res, next) => {
        Admin.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })
    .get('/verify', ensureAuth, (req, res) => {
        res.status(200).send({ success: true });
    });

module.exports = router;