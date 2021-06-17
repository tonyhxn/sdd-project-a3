const express = require('express');
const router =  express.Router();

// Create Item and Save item
// Import Item Model
const Item = require('../models/Item')
const generateProductId = require('../modules/product_string')

// Create Item
router.post('/create', (req, res) => {
    try {
        const { title, price, image } = req.body;
    
        if ( !title || !price || !image) { // If either title, price, image doesn't exist, send error message for missing fields
            res.send({response: 'Missing form fields'})
        }
        else {
            var item_id = 'B7uZ1JpD5pbp' // generateProductId()
            while (true) {
                console.log(item_id)
                if (Item.findOne({ item_id: item_id })) {
                    console.log('Item id exists: Generating new item id')
                    item_id = generateProductId()
                } else {
                    console.log('Unique item id created')
                    break   
                }
            };      
            
            console.log('Constructing new item...')
            const newItem = new Item({
                title,
                price,
                image,
                item_id
            });
            newItem.save();
            console.log('Saved new item successfully');
            res.send({response: 'Captured form data successfully'});
        };
    } catch (error) {
        res.send({response: `[${error}] Error processing request`}) // Safer error handling encompassing a greater scope if processing request encounters error, does not crash program instead returns error response
    }
});

// Return Items

module.exports = router;