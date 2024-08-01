const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log('From User Controller', req.body);
    console.log(confirmPassword);

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(200).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ token, username: savedUser.username });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ message: 'Server error' });

    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

       res.json({ token, username: user.username });
    } catch (error) {
        res.status(400).json({ message: 'Server error' })
    }
}


const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateUser = async(req, res) =>{
    const {name, email, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Old password is incorrect'});
        }

        user.username = name || user.username;
        user.email = email || user.email;
        if(newPassword){
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();
        res.status(200).json({message: 'Profile updated Successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server Error', error});
        
    }
}

module.exports = { registerUser, loginUser, getCurrentUser, updateUser };
