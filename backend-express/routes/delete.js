const express = require('express');
const router =  express.Router();

// Import Item Model
const Item = require('../models/Item'); // Contains mongodb schema for item model
// Import Market Price Model
const Market = require('../models/MarketPrice'); // Contains mongodb schema for marketprice model

router.post('/delete', async (req, res) => {
    const { item_id } = req.body
    
});