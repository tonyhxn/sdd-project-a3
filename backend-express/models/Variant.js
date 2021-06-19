const mongoose = require('mongoose');
const VariantSchema = new mongoose.Schema({
    variant: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    listing_status: {
        type: String,
        required: true
    }
});

const Variant = mongoose.model('Variant', VariantSchema) // construct mongoose model using schema

module.exports = Variant; // export as object