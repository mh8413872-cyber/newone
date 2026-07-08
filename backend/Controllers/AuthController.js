const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Signup Success'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email'
            });
        }

        const comparePass = await bcrypt.compare(
            password,
            user.password
        );

        if (!comparePass) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            "mysecretkey",
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: 'Login Success',
            token,
            name: user.name
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    signup,
    login
};