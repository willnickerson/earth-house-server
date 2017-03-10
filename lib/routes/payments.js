// sk_test_WQYhuQf5OmPPCJQdCg4Nldx1
// pk_test_HS62OmJo7gCzA7fcN2ObL2rF

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_WQYhuQf5OmPPCJQdCg4Nldx1');
const bodyParser = require('body-parser').json();

router
    .post('/', bodyParser, (req, res) => { 
        const token = req.body.stripeToken;
        const chargeAmount = req.body.chargeAmount;
        //we will need to add the adress and itemized list somewherei n here
        const charge = stripe.charges.create({ //eslint-disable-line
            amount: chargeAmount,
            currency: 'usd',
            description: 'Test charge',
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