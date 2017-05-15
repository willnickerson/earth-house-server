const secretTestKey = process.env.STRIPE_SK_TEST;
//TODO: put in drew's live key
const stripeSecretKey = process.env.STRIPE_SK_LIVE || secretTestKey;

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(stripeSecretKey);
const bodyParser = require('body-parser').json();

router
    .post('/', bodyParser, (req, res) => { 
        console.log('Our metadata', req.body.metadata);
        const token = req.body.stripeToken;
        const description = req.body.description;
        const chargeAmount = req.body.chargeAmount;
    
        const charge = stripe.charges.create({ //eslint-disable-line
            amount: chargeAmount,
            currency: 'usd',
            description: description,
            source: token,
        }, (err, charge) => { //eslint-disable-line
            if(err && err.type === 'StripeCardError') {
                console.log('card invalid');
                res.err(err);
            }
            console.log('payment success', token, chargeAmount, charge);
            res.send('payment success'); 
        });
    });

module.exports = router;