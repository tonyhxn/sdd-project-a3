// GET request using fetch to retrieve all items from /retrieve api

function sleep(ms) { // delays execution by desired milliseconds input
    return new Promise((resolve) => {
      setTimeout(resolve, ms); // waits for the delay desired
    });
} 

const getItems = async () => { 
    try {
        const response = await fetch('http://localhost:3000/api/retrieve');
        let raw_all_items = await response.json(); // extract all items json from response object
        return raw_all_items // return all items 
    } catch (err) {
        return {error: true, response: err}
    };
}

function createNet(item_id, net_amount) { // assign background colour according to net amount positive or negative or equals to zero
    if (net_amount > 0) {
        net_amount_colour = '#0baa40'
    } else if (net_amount == 0) {
        net_amount_colour = 'dodgerblue'
    } else if (net_amount < 0) {
        net_amount_colour = '#ff5a5f'
    } else {
        net_amount_colour = 'black'
    }
    
    return `<label class="netamount-label" id="${item_id}-net" style="background-color:${net_amount_colour};">$${net_amount}</label>`
}

const getMarketPrice = async (item_id) => {
    try {
        const response = await fetch('http://localhost:3000/api/marketprice', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                item_id: item_id,
            })
        });
        let market_price_object = await response.json(); // extract all items json from response object
        let market_price = market_price_object.market_price;
        let market_prices = market_price_object.market_prices;
        return {market_price:market_price, market_prices:market_prices} // return market price and market prices
    } catch (err) {
        return {error: true, response: err}
    };
};

// Define global variables that will be updated on the dashboard
var total_profit = 0;
var market_evaluation = 0;
var total_cost = 0;
var total_sold = 0;
var units_sold = 0;
var units_total = 0;

// Rendering dashboard functions
// Includes rendering the table, updating prices displayed upon the cards

async function updateDashboard() {
    let raw_all_items = await getItems()
    if (raw_all_items.error == true) {
        document.getElementById("loading-message").hidden = true;
        document.getElementById("loading-message").innerHTML =  `[${raw_all_items.response}] Error retrieving items from database 😭`;
    } else if (raw_all_items == false) {
        document.getElementById("loading-message").hidden = false;
        document.getElementById("loading-message").innerHTML = 'No items in database 😢, Click Add to get started 😊! <br/> Still Unsure? Click <i class="fas fa-book" aria-hidden="true"></i> Help';
    } else {
        try {
            document.getElementById("loading-message").innerHTML =  'Please bare with us, whilst we display your items! 🥳';
            
            let display_data = [];

            for (let i=0; i < raw_all_items.length; i++) {
                let raw_item = raw_all_items[i]
                let {item_id, image, title, price, variants: raw_variants} = raw_item // raw_variants, meaning raw unformatted data from the request
                let market_price_data = await getMarketPrice(item_id);
                let market_price = market_price_data.market_price;

                raw_variants.forEach(variant_object => {
                    
                    let {variant, active:active_inventory, sold:sold_inventory, date: raw_date} = variant_object;
                    let date = new Date(raw_date).toLocaleDateString("en-US")
                    let net_amount = (market_price - price).toFixed(2); // Round to 2 decimal places

                    total_cost += (price*(active_inventory+sold_inventory));
                    total_profit += (net_amount*sold_inventory);
                    market_evaluation += (market_price*active_inventory);
                    total_sold += (sold_inventory*market_price);
                    units_sold += (sold_inventory);
                    units_total += (active_inventory + sold_inventory);
                    
                    display_data.push(
                        {
                            item_id: item_id,
                            image: '<img class="item-icon" src="'+image+'" />',
                            title: title,
                            variant: variant,
                            active: active_inventory,
                            sold: sold_inventory,
                            price: '$' + price.toFixed(2), 
                            market: `<label id="${item_id}"> $${market_price.toFixed(2)}`,
                            net: createNet(item_id, net_amount),
                            date: date
                        }
                    )
                    
                });
            }

            $('#table').bootstrapTable({
                pagination: true,
                search: true,
                columns: [
                    {
                        field: 'item_id',
                        title: 'Item ID'
                    }, {
                        field: 'image',
                        title: 'Image'
                    }, {
                        field: 'title',
                        title: 'Title'
                    }, {
                        field: 'variant',
                        title: 'Variant'
                    }, {
                        field: 'active',
                        title: 'Active'
                    }, {
                        field: 'sold',
                        title: 'Sold'
                    }, {
                        field: 'price',
                        title: 'Price'
                    }, {
                        field: 'market',
                        title: 'Market',
                    }, {
                        field: 'net',
                        title: 'Net'
                    }, {
                        field: 'date',
                        title: 'Date'
                    }
                ],
                data: display_data
            });

            document.getElementById("market_eval").innerHTML = market_evaluation.toFixed(2);
            document.getElementById("total_cost").innerHTML = total_cost.toFixed(2);
            document.getElementById("total_profit").innerHTML = total_profit.toFixed(2);
            document.getElementById("total_sales").innerHTML = total_sold.toFixed(2);
            document.getElementById("items_sold").innerHTML = `${units_sold} / ${units_total}`;
            document.getElementById("loading-message").hidden = true
        } catch (error) {
            document.getElementById("loading-message").hidden = false
            document.getElementById("loading-message").innerHTML =  `[${error}] Error displaying items 😭`;
        };
    };
};

updateDashboard()

