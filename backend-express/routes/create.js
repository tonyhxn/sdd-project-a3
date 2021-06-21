const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model

// Import Market Price Model
const Market = require('../models/MarketPrice'); // Contains mongodb schema for marketprice model

// Import item id generation function
const generateItemId = require('../modules/product_string');

// Import validate listing status function
const validate_var = require('../modules/validate_var');

// Create Item and Save item
router.post('/create', async (req, res) => {
    try {
        const { title, price, image, variants: raw_variants } = req.body;
        if ( !title || !price || !image || !raw_variants) { // If either title, price, variants or image doesn't exist
            res.send({response: 'Missing form fields'}); // send error message for missing fields back to frontend request
        } else if (validate_var(raw_variants)) { // Validate the data, that variants have variant, active, sold
            res.send({response: 'Invalid variants'}); // send error message for invalid field back to frontend request
        } else {
            let item_id = await generateItemId(); // generate a new random 
            let item_exists = false
            while (item_exists == false) { 
                await console.log(`[${item_id}] Checking if item id exists...`);
                const item_exists = await Item.exists({ item_id: item_id }); // Await for asynchronous function to return a response or error
                if (item_exists == true) { // check if item id already exists
                    console.log(`[${item_id}] Item id exists: Generating new item id`); // if exists, generate new item id and then pass through check again until unique id is generated
                    item_id = await generateItemId(); 
                } else if (item_exists == false) {
                    console.log(`[${item_id}] Unique item id generated`); // if doesn't exist, meaning it is a unique item id
                    break
                } else {
                    console.log(`[${item_exists}] Unkown value of item_exists`); // if not true or false, may be undefined value retry generating unique item id
                }
            };
            await console.log(`[${item_id}] Constructing new item...`); // Creating new item model using variables from request body

            let variants = [];
            let new_variant_timestamp = Date.now(); // defining timestamp, so that it doesn't change if it were redefined every iteration in a for loop => slightly different times
            raw_variants.forEach(variant => {
                variant.date = new_variant_timestamp
                variants.push(variant)
            });

            const newItem = await new Item({
                title: title,
                price: price,
                image: image,
                variants: variants,
                item_id: item_id
            });

            const newMarketItem = await new Market({
                market_price: price,
                item_id: item_id
            });

            await newItem.save(); // insert new item object into database
            await newMarketItem.save(); // insert new market item object into database
            await console.log(`[${item_id}] Saved new item successfully`); // log the status of creating item process
            await res.send({response: `[${item_id}] Saved new item successfully`}); // complete response to frontend request 
        };
    } catch (error) {
        res.send(`[${error}] Error processing create request`) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

module.exports = router; // export route /create