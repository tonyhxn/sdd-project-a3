const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model

// Retrieve Items
router.get('/retrieve', async (req, res) => {
    try {
        await console.log('Retrieving item(s) from database...')
        const all_items = await Item.find(); // retrieve all items from database
        await console.log(`Retrieved ${all_items.length} item(s) from database`) // display number of items in database
        if (all_items.length === 0) {
            res.send(false) // if no items are in database, return false
        } else { // otherwise, items are present in database 
            res.send(all_items) // completing request by sending all_items as response
            await console.log(`Returned all_items to frontend response`)
        }
    } catch (error) {
        res.send(`[${error}] Error processing retrieve request`) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

module.exports = router; // export route /retrieve