const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    listing_status: {
        type: String,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema) // construct mongoose model using schema

module.exports = Item; // export as object