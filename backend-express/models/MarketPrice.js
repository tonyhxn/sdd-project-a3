const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
    market_price: {
        type: Number,
        required: true
    },
    market_prices: {
        type: Array,
        required: true
    },
    item_id: {
        type: String,
        required: true
    }
});

const Market = mongoose.model('Market', MarketSchema) // construct mongoose schema model

module.exports = Market; // export as object Item 