const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth');

const User = require('../../models/user');

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({ msg: 'All fields are required' });

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                username,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        })
                })
            })
        })
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'All fields are required' });

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

                    jwt.sign(
                        { id: user.id },
                        config.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                        }
                    );
                })
        })
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;