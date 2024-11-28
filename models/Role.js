const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [String], // Define permissions
});

module.exports = mongoose.model('Role', roleSchema);
