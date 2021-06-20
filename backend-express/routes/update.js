const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model

// Import validate listing status function
const validate_var = require('../modules/validate_var');

// Update Item
router.post('/update', async (req, res) => {
    try {
        const {title, price, image, variants: raw_variants, item_id} = req.body;
        if ( !title || !price || !image || !raw_variants ||!item_id) { // If either title, price, variants, item_id or image doesn't exist
            res.send({response: 'Missing form fields'}); // send error message for missing fields back to frontend request
        } else if (validate_var(raw_variants, 'update')) { // Validate the data, that variants have variant, active, sold, date
            res.send({response: 'Invalid variants'}); // send error message for invalid field back to frontend request
        } else {
            console.log(`[${item_id}] Retrieving item from database to be checked`)
            let variants = [] // defining a formatted variants array that will store the updated variants array after comparing the new and current variants
            let current_item = await Item.findOne({ item_id: item_id }); // Find current version of item in the database
            let new_variant_timestamp = Date.now(); // defining timestamp, so that it doesn't change if it were redefined every iteration in a for loop => slightly different times
            for (let i=0; i < raw_variants.length; i++) { // iterating through each variant that is from the new variants
                let variant = raw_variants[i]
                var variant_inserted = false // the variant has not been inserted into new variants array yet, thus equals false
                for (let i=0; i < current_item.variants.length; i++) { // iterating through each variant of the current variants in the database
                    var current_variant = current_item.variants[i]
                    // comparing values of the variants, as it is not possible to equate objects directly 
                    if (variant.variant == current_variant.variant && variant.active == current_variant.active && variant.sold == current_variant.sold && variant.date == current_variant.date){ // if both variants match
                        variants.push(variant) // add variant into variants, as it did not change thus doesn't need to update the timestamp
                        variant_inserted = true // variant has been inserted, thus equals true
                        break // Break out of inside loop after it has finished checking the new variant to maximise efficiency, eliminating the need for useless further checks as it has already found a match
                    }
                }
                if (variant_inserted == false) { // using variant_inserted as a check to not override the variant that had been already inserted in the above for loop check
                    // if it hasn't been inserted already, it must be a new/changed variant thus add to variants with updated timestamp
                    variant.date = new_variant_timestamp // Update date
                    variants.push(variant) // Save changed variant into variants
                }
            };  

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
        res.send(`[${error}] Error processing update request`) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

module.exports = router; // export route /update