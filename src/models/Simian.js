const mongoose = require('mongoose');

const SimioSchema = new mongoose.Schema({
    dna: String,
    result: Boolean
},{
    timestamps: true,
});

module.exports = mongoose.model('Simio', SimioSchema);