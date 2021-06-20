const express = require('express');
const router =  express.Router();

// Create Item and Save item
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


// let all_items = [] // array to be returned to frontend 
            // for (let i=0; i < all_listings.length; i++) { // iterating through each item, formatting and parsing into active and sold listings
            //     await console.log(`Item [${i+1}]: Formatting item and listing status`)
            //     let listing = all_listings[i]
            //     let active_listings = [];
            //     let sold_listings = [];
            //     let variants = listing.variants
            //     for (let i=0; i < variants.length; i++) { // iterating through each variant in variants
            //         if (variants[i].listing_status == 'Active') { // if active listing sort into active_listings
            //             active_listings.push(
            //                 variants[i] // add the variant to active listing
            //             )
            //         } else if (variants[i].listing_status == 'Sold') { // if sold listing sort into sold_listings
            //             sold_listings.push(
            //                 variants[i] // add the variant to sold listing
            //             )
            //         }
            //     }
            //     let formatted_item = { // formatted item containing formatted listings 
            //         title: listing.title,
            //         price: listing.price,
            //         image: listing.image,
            //         item_id: listing.item_id,
            //         active_listings: active_listings,
            //         sold_listings: sold_listings,
            //         createdAt: listing.createdAt,
            //         updatedAt: listing.updatedAt,
            //     }
            //     all_items.push(formatted_item) // add formatted item to all items array
            //     await console.log(`Item [${i+1}]: Added formatted item and listing status to all_items`)
            // }