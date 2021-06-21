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
            let change = [Math.floor((Math.random() * 50) + 1), -(Math.floor((Math.random() * 50) + 1))] // array containing a random number either between -50 to 50, simulating a random change in the marketprice
            let market_price = (market_item.market_price + change[Math.floor(Math.random() * change.length)]).toFixed(2) // apply the market price with the random change generated previously, with only 2 decimal places
            console.log(market_price)
            await Market.updateOne(
                { item_id: item_id },
                { market_price: market_price}
            );
        }
        await sleep(3000) // Update the market price every 5 seconds or 5000 milliseconds
    }
};

module.exports = updateMarket; // export as function