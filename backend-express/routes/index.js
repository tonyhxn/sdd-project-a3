const express = require('express');
const router =  express.Router();

// Create Item and Save item
// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model
// Import item id generation function
const generateItemId = require('../modules/product_string');

// Create Item
router.post('/create', async (req, res) => {
    try {
        const { title, price, image, listing_status } = req.body;
        if ( !title || !price || !image) { // If either title, price, listing status or image doesn't exist
            res.send({response: 'Missing form fields'}); // send error message for missing fields back to frontend request
        } else if (listing_status !== 'Sold' && listing_status !==  'Active') { // Validate the data, that listing status only has two inputs (sold/active)
            res.send({response: 'Invalid listing status'}); // send error message for invalid field back to frontend request
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
            const newItem = await new Item({
                title,
                price,
                image,
                listing_status,
                item_id
            });
            await newItem.save(); // insert new item object into database
            await console.log(`[${item_id}] Saved new item successfully`); // log the status of creating item process
            await res.send({response: `[${item_id}] Saved new item successfully`}); // complete response to frontend request 
        };
    } catch (error) {
        res.send({response: `[${error}] Error processing create request`}) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    };
});

// Update Item
router.post('/update', async (req, res) => {
    try {
        const {title, price, image, listing_status, item_id} = req.body;
        if ( !title || !price || !image || !item_id) { // If either title, price, item_id or image doesn't exist
            res.send({response: 'Missing form fields'}); // send error message for missing fields back to frontend request
        } else if (listing_status !== 'Sold' && listing_status !==  'Active') { // Validate the data, that listing status only has two inputs (sold/active)
            res.send({response: 'Invalid listing status'}); // send error message for invalid field back to frontend request
        } else {
            await Item.updateOne({item_id: item_id}, {
                title,
                price,
                image,
                listing_status
            }, (err, resp) => {
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
        console.log(`${error} Error processing update request`)
    };
});

// Return Items


// Price of items api


module.exports = router;