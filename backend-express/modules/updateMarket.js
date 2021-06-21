const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model
// Import Market Price Model
const Market = require('../models/MarketPrice'); // Contains mongodb schema for marketprice model

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms); // waits for the delay desired
    });
} 

async function updateMarket() {
    while (true) { // Infinitely update the marketprice to simulate market value fluctuations
        await console.log(`[Updating Market] Retrieving item(s) from database...`)
        const all_items = await Item.find(); // retrieve all items from database
        await console.log(`[Updating Market] Retrieved ${all_items.length} item(s) from database`) // display number of items in database  
        for (let i=0; i < all_items.length; i++) {
            item = all_items[i]
            item_id = item.item_id
            const market_item = await Market.findOne({ item_id: item_id }); // Find marketprice for respective item_id
            let old_market_price = market_item.market_price
            let change_array = [Math.floor((Math.random() * 25) + 1), -(Math.floor((Math.random() * 25) + 1))] // array containing a random number either between -25 to 25, simulating a random change in the marketprice
            if (old_market_price < 0) { // Making sure market price doesn't go negative. If negative, make a positive change to the market price
                var market_price = (old_market_price + change_array[0]).toFixed(2)
            } else {
                let change = change_array[Math.floor(Math.random() * change_array.length)]
                if (change > market_price) { // Ensuring the change doesn't make marketprice go negative.
                    change = change_array[0]
                }

                var market_price = (old_market_price + change).toFixed(2)
            }
             // apply the market price with the random change generated previously, with only 2 decimal places
            await Market.updateOne(
                { item_id: item_id },
                { market_price: market_price}
            );
            console.log(`[Updated Market] [${item_id}] [$${market_price}] New Market Price!`) // display new value of market price change in console  
        }
        await sleep(3000) // Update the market price every 5 seconds or 5000 milliseconds
    }
};

module.exports = updateMarket; // export as function