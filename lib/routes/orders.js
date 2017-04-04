const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const bodyParser = require('body-parser').json();
const nodemailer = require('nodemailer');


router
    //maybe add in a query object so that we can filter the order by completed and not
    .get('/', (req, res, next) => {
        Order.find()
            .then(orders => res.send(orders))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Order.findById(req.params.id)
            .then(order => res.send(order))
            .catch(next);
    })
    .post('/gmail', (req, res, next) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS    
            }
        });

        //when the test is successsfull we will start using info from the order to change the email text and reciever
        const mailOptions = {
            from: `Earth House Juice Co <${process.env.EMAIL_USER}>`,
            to: 'wnickers@willamette.edu', //this will change
            subject: 'Your order confirmation from Earth House',
            text: 'Thank you for placing your purchase! A summary of your order is included below:' //this will change
        };

        const sendMail = () => {
            transporter.sendMail(mailOptions, (err, response) => {
                if(err) {
                    console.log('ERROR:', err);
                    next(err);
                } else {
                    console.log('email sent', response);
                    res.send(response);
                }
            });
        }
        sendMail();
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
        }
        new Order(req.body).save()
            .then(saved => {
                let orderSummary = '<thead><tr><th>item</th><th></th><th>Qty</th><th>subTotal</th></tr></thead><tbody>';
                saved.items.forEach(item => {
                    orderSummary += `<tr><td>${item.name}</td><td> X </td><td>${item.quantity}</td><td>$${item.subTotal}</tr>`;
                })
                orderSummary += `</tbody><tfoot><tr><tf colspan="3">total: </tf><tf>$${saved.total}</tf></tr></tfoot>`
                const address = `<p>${saved.name} <br> ${saved.address.line_1 + ' ' + saved.address.line_2} <br> ${saved.address.city}, ${saved.address.state} ${saved.address.zip}</p>`
                const mailOptions = {
                    from: `Earth House Juice Co <${process.env.EMAIL_USER}>`,
                    to: 'wnickers@willamette.edu',
                    subject: 'Your order confirmation from Earth House',
                    html: `<html><body>Thank you for placing your purchase! A summary of your order is included below:<br><table>${orderSummary}</table><p>For delivery to</p>: ${address}</body></html>` //this will change
                };
                mailOptions.to = req.body.email;
                sendMail(mailOptions);
                return saved;
            })
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;