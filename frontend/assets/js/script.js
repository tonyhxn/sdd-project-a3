// GET request using fetch to retrieve all items from /retrieve api

function delay(miliseconds) { // delay function to simulate a smoother and realistic execution of program
    let currentTime = new Date().getTime(); // get the current time
    while (currentTime + miliseconds >= new Date().getTime()) { // execute a while function that does nothing until time is equated or greater than the milliseconds of delay elapsed from function initial call time.
        // Hence achieving the purpose of a simulated delay
    }
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
        let market_price = market_price_object.market_price
        return market_price // return all items 
    } catch (err) {
        return {error: true, response: err}
    };
};

function getNetColour(net_amount) {
    if (net_amount > 0) {
        net_amount_colour = '#0baa40'
    } else if (net_amount == 0) {
        net_amount_colour = 'dodgerblue'
    } else if (net_amount < 0) {
        net_amount_colour = '#ff5a5f'
    } else {
        net_amount_colour = 'black'
    }

    return net_amount_colour
}

// Define global variables that will be updated on the dashboard
var items_table = 0;
var total_profit = 0;
var market_evaluation = 0;
var total_cost = 0;
var total_sold = 0;
var units_sold = 0;
var units_active = 0;
var units_total = 0;

// Rendering dashboard functions
// Includes rendering the table, updating prices displayed upon the cards

async function updateDashboard() {
    let raw_all_items = await getItems()
    let all_items = [];
    let display_data = [];
    if (raw_all_items.error == true) {
        document.getElementById("loading-message").innerHTML =  `[${raw_all_items.response}] Error retrieving items from database 😭`;
    } else if (raw_all_items == false) {
        document.getElementById("loading-message").innerHTML = 'No items in database 😢, Click Add to get started 😊! <br/> Still Unsure? Click <i class="fas fa-book" aria-hidden="true"></i> Help';
    } else {
        try {
            document.getElementById("loading-message").innerHTML =  'Please bare with us, whilst we display your items! 🥳';
            let display_data = [];
            
            for (let i=0; i < raw_all_items.length; i++) {
                let raw_item = raw_all_items[i]
                let {item_id, image, title, price, variants: raw_variants} = raw_item // raw_variants, meaning raw unformatted data from the request
                let market_price = await getMarketPrice(item_id);

                let variants = [];
                
                raw_variants.forEach(variant_object => {
                    
                    let {variant, active:active_inventory, sold:sold_inventory, date: raw_date} = variant_object;
                    let date = new Date(raw_date).toLocaleDateString("en-US")
                    let net_amount = (market_price - price).toFixed(2); // Round to 2 decimal places
                    let net_amount_colour = getNetColour(net_amount)

                    total_cost += price*(active_inventory+sold_inventory);
                    total_profit += net_amount*sold_inventory
                    market_evaluation += market_price*active_inventory
                    total_sold += sold_inventory*market_price
                    units_sold += sold_inventory
                    units_total += active_inventory + sold_inventory

                    display_data.push(
                        {
                            item_id: item_id,
                            image: '<img class="item-icon" src="'+image+'" />',
                            title: title,
                            variant: variant,
                            active: active_inventory,
                            sold: sold_inventory,
                            price: '$' + price,
                            market: '$' + market_price,
                            net: `<label class="netamount-label" style="background-color:${net_amount_colour};">$${net_amount}</label>`,
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
            document.getElementById("loading-message").remove()
        } catch (error) {
            document.getElementById("loading-message").innerHTML =  `[${error}] Error displaying items 😭`;
        };
    };
};

updateDashboard()
// await all_items.forEach(item => {
//     let item_id = item.item_id
//     // let market_price = 
//     let image = item.image
//     let title = item.title
//     let price = item.price
//     let raw_variants = item.variants // raw_variants, meaning raw unformatted data from the request
//     let market_price = 229.99
    
//     let variants = [];

//     raw_variants.forEach(variant_dict => {
//         let variant = variant_dict.variant
//         let active_inventory = variant_dict.active
//         let sold_inventory = variant_dict.sold
//         let date = new Date(variant_dict.date).toLocaleDateString("en-US")
//         let net_amount = (market_price - price).toFixed(2); // Round to 2 decimal places

//         total_cost += price*(active_inventory+sold_inventory);
//         total_profit += net_amount*sold_inventory
//         market_evaluation += market_price*active_inventory
//         total_sold += sold_inventory*market_price
//         units_sold += sold_inventory
//         units_total += active_inventory + sold_inventory

//         if (net_amount > 0) {
//             net_amount_colour = '#0baa40'
//         } else if (net_amount == 0) {
//             net_amount_colour = 'dodgerblue'
//         } else if (net_amount < 0) {
//             net_amount_colour = '#ff5a5f'
//         } else {
//             net_amount_colour = 'black'
//         }

//         item_rows += `<th scope="row">${item_id}</th>`
//         item_rows += `<td><img src="${image}" class="item-icon"></td>`
//         item_rows += `<td>${title}</td>`
//         item_rows += `<td>${variant}</td>`
//         item_rows += `<td>${active_inventory}</td>`
//         item_rows += `<td>${sold_inventory}</td>`
//         item_rows += `<td>$${price}</td>`
//         item_rows += `<td>$${market_price}</td>`
//         item_rows += `<td style="color: ${net_amount_colour};">$${net_amount}</td>` 
//         item_rows += `<td>${date}</td>`
//         item_rows += `<td><a href="#">Edit</a></td></tr>`
//     });
    
// });
