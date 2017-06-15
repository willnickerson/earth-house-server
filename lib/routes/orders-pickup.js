const express = require('express');
const router = express.Router();
const Order = require('../models/order-pickup');
const bodyParser = require('body-parser').json();
const nodemailer = require('nodemailer');
const ensureAuth = require('../auth/ensure-auth')();
const Pickup = require('../models/pickup');


router
    //maybe add in a query object so that we can filter the order by completed and not
    .get('/', ensureAuth, (req, res, next) => {
        const query = {};
        if(req.query.finished) query.finished = req.query.finished;
        Order.find(query)
            .populate('pickup', 'name')
            .then(orders => res.send(orders))
            .catch(next);
    })
    .get('/:id', ensureAuth, (req, res, next) => {
        Order.findById(req.params.id)
            .then(order => res.send(order))
            .catch(next);
    })
    .put('/:id', ensureAuth, bodyParser, (req, res, next) => {
        Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })
    .delete('/:id', ensureAuth, (req, res, next) => {
        Order.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS    
            }
        });

        const sendMail = options => {
            transporter.sendMail(options, (err, response) => {
                if(err) {
                    console.log('ERROR:', err);
                    next(err);
                } else {
                    console.log('email sent', response);
                    res.send(response);
                }
            });
        };
        new Order(req.body).save()
            .then(saved => {
                console.log(saved);
                let orderSummary = '<thead><tr><th>item</th><th></th><th>Qty</th><th>subTotal</th></tr></thead><tbody>';
                saved.items.forEach(item => {
                    orderSummary += `<tr><td>${item.name}</td><td> x </td><td>${item.quantity}</td><td>$${item.subTotal}</tr>`;
                });
                orderSummary += `</tbody><tfoot><tr><td></td><td></td><td></td><td style="font-weight:bold">total: $${saved.total}</td></tr></tfoot>`;
                const pickupDate = new Date(saved.pickupDate).toDateString();
    
                Pickup.findById(saved.pickup)
                    .then(data => {
                        const location = data.name;
                        const pickup = `<div style="width:80%; margin: 0 auto"><p>${location} on ${pickupDate}</p></div>`;
                        const mailOptions = {
                            from: `Earth House Juice Co <${process.env.EMAIL_USER}>`,
                            to: '',
                            bcc: process.env.EMAIL_USER,
                            subject: 'Your order confirmation from Earth House',
                            html: `<html><body>Thank you for your purchase! A summary of your order is included below:<br><table style="width: 80%; margin: 0 auto; text-align: center">${orderSummary}</table><p>For pickup at: ${pickup}</p><p>If there is an error with your order let me know in a reply to this email. For reference, your order id is: ${saved._id}</p></body></html>`
                        };
                        mailOptions.to = req.body.email;
                        sendMail(mailOptions);
                    });
                return saved;
            })
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;