// Dependencies
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Config variables
const config = require('../config/config');

// Models
const User = require('../models/user');

// Controllers
const signup = async (req, res) => {

    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) return res.status(400).json({ msg: 'All fields are required' });
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Passwords do not match' })

    try {

        const usernameInUse = await User.findOne({ username });
        const emailInUse = await User.findOne({ email });

        if (usernameInUse) return res.status(400).json({ msg: 'Username already in use' });
        if (emailInUse) return res.status(400).json({ msg: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const userCreated = newUser.save();

        if (userCreated) return res.status(200).json({ msg: 'User successfully created' });

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Something went wrong. Try again!' });
    }

}

const signin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: 'All fields are required' });

    try {

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

        jwt.sign(
            { id: user.id },
            config.JWT_SECRET,
            { expiresIn: 900 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username
                    }
                });
            }
        );

    } catch (err) {
        res.status(400).json({ msg: 'Oops! Something went wrong. Please try again!' });
    }

}

const user = async (req, res) => {

    const { id } = req.user;

    const user = await User.findById(id, 'id username')

    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    res.status(200).send(user);

}

module.exports = {
    signup,
    signin,
    user
}