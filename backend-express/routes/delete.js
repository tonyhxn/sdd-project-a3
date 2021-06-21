const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model
// Import Market Price Model
const Market = require('../models/MarketPrice'); // Contains mongodb schema for marketprice model

router.post('/delete', async (req, res) => {
    try {
        const { item_id } = req.body;
        await console.log(`[${item_id}] Deleting item and associated marketprice off database...`)
        await Item.deleteOne({item_id: item_id})
        await Market.deleteOne({item_id: item_id})
        res.send({success: true}) // return true if successful deletion
        await console.log(`[${item_id}] Successfully deleted item and associated marketprice off database...`)
    } catch (error) { // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
        res.send({success: false, error: error}) // return false and error message if deletion is unsuccessful
        console.log(`[${error}] Error processing delete request`) 
    };
});

module.exports = router; // export route /retrieve