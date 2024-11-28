const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register route
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user
        const user = new User({ username, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error during registration' });
    }
};

// Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id, username: user.username, role: user.role, permissions: user.permissions },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Get logged-in user's details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching user details' });
    }
};

// View all users (Admin and Moderator only)
exports.viewUsers = async (req, res) => {
    if (!req.user.permissions.includes('viewUsers')) {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching users' });
    }
};

// Update user details (Admin-only action)
exports.updateUserDetails = async (req, res) => {
    if (!req.user.permissions.includes('updateUserDetails')) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const { id } = req.params;
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error while updating user details' });
    }
};
