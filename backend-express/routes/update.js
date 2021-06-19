const express = require('express');
const router =  express.Router();

// Create Item and Save item
// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model

// Import validate listing status function
const validate_ls = require('../modules/validate_ls');

// Update Item
router.post('/update', async (req, res) => {
    try {
        const {title, price, image, variants, item_id} = req.body;
        if ( !title || !price || !image || !variants ||!item_id) { // If either title, price, variants, item_id or image doesn't exist
            res.send({response: 'Missing form fields'}); // send error message for missing fields back to frontend request
        } else if (validate_ls(variants)) { // Validate the variants data, that listing status only has two inputs (sold/active)
            res.send({response: 'Invalid listing status'}); // send error message for invalid field back to frontend request
        } else {
            await Item.updateOne(
                { item_id: item_id },
                { title, price, image, variants},
                (err, resp) => {
                if (err) {
                    console.log(`[${err}] [${item_id}] Error encountered whilst updating database`) // error message alerting of an error occuring in the update api
                } else if (resp.n === 1) {
                    console.log(`[${item_id}] Updated item successfully`) // log the status of updating item database
                    res.send({response: `[${item_id}] Updated item successfully`}) // complete response to frontend request 
                } else if (resp.n === 0) {
                    console.log(`[${item_id}] Item id not found`) // Item with item_id that is being updated is not found in the database incurring in a response with n: 0
                    res.send({response: `[${item_id}] Item id not found`}) // complete response to frontend request
                } else {
                    console.log(`[${item_id}] Item id updated`) // If doesn't return 1 or 0, but doesn't crash app. Null response
                    res.send({response: `[${item_id}] Item id updated`}) // complete response to frontend request
                }
            });
        }
    } catch (error) {
        res.send(`${error} Error processing update request`) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

module.exports = router; // export route /update