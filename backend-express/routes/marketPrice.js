const express = require('express');
const router =  express.Router();

// Import market price Model
const Market = require('../models/MarketPrice'); // Contains mongodb schema for market price model

// Retrieve Market price
router.post('/marketprice', async (req, res) => {
    try {
        const { item_id } = req.body;
        await console.log(`Retrieving price for Item ${item_id} from database...`)
        const market_item = await Market.findOne({ item_id: item_id }); // Find marketprice for respective item_id
        const market_price = await market_item.market_price
        await console.log(`Retrieved Item ${item_id}: Marketprice [$${market_price}] from database`)
        res.send({market_price: market_price}) // completing request by sending market_price as response
        await console.log(`Returned Item ${item_id}: Marketprice [$${market_price}] to frontend response`)
    } catch (error) {
        res.send(`[${error}] Error processing retrieve request`) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

module.exports = router; // export route /retrieve