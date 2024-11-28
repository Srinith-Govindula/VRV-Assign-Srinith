const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User', 'Moderator'], default: 'User' },
    permissions: { type: [String], default: [] },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    // Set permissions based on roles
    if (this.role === 'Admin') {
        this.permissions = ['viewUsers', 'updateUserDetails'];
    } else if (this.role === 'Moderator') {
        this.permissions = ['viewUsers'];
    } else {
        this.permissions = [];
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
