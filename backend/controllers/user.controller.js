const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.register = (req, res) => {
    var user = new User(req.body);
    console.log(req.body)
    user.save((err) => {
        if (!err)
            res.send(doc);
        else if (err.code == 11000) {
                res.status(422).send(['Duplicate email adrress found.']);
        }
            else
                return res.json(user);
    });
}

module.exports.login = (req, res) => {

    email = req.body.email;
    User.findOne({email: email}).exec((user, err) => {
        if (err) {
            return res.status(422).send({
                message: 'error'
            });
        } else  if (!user) {
            return res.status(401).send({
                message: 'User is not found.'
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                return (null, user)
            } else {
                return res.status(422).send({
                    message: 'error'
                });
            }
        })
    }) 
}

module.exports.logout = (req, res) => {

    email = req.body.email;
    User.findOne({ email: email }).exec((user, err) => {
        if (err) {
            return res.status(422).send({
                message: 'error'
            });
        } else if (!user) {
            return res.status(401).send({
                message: 'User is not found.'
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result === true) {
                return (null, user)
            } else {
                return res.status(422).send({
                    message: 'error'
                });
            }
        })
    })
}