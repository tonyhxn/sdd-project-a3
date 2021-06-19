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
    variants: {
        type: Array,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
}, { timestamps: true }); // parameter for adding createdAt and updatedAt timestamps

const Item = mongoose.model('Item', ItemSchema) // construct mongoose schema model

module.exports = Item; // export as object Item 