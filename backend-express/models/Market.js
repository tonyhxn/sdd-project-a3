const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    market_price: {
        type: Number,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
}, { timestamps: true }); // parameter for adding createdAt and updatedAt timestamps

const Market = mongoose.model('Market', MarketSchema) // construct mongoose schema model

module.exports = Market; // export as object Item 