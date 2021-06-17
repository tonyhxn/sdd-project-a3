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
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    item_id: {
        type: String,
        required: true
    },
});

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item;