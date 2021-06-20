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
        let all_items = await response.json(); // extract all items json from response object
        return  all_items // return all items 
    } catch (err) {
        return {error: true, response: err}
    };
}

// Define global variables that will be updated on the dashboard
var items_table = '';
var total_profit = '';
var market_evaluation = '';
var total_cost = '';
var total_sold = '';


// Rendering dashboard functions
// Includes rendering the table, updating prices displayed upon the cards

async function updateDashboard() {
    let all_items = await getItems()
    console.log(all_items)
    if (all_items.error == true) {
        document.getElementById("loading-message").innerHTML =  `[${all_items.response}] Error retrieving items from database 😭`;
    } else if (all_items == false) {
        document.getElementById("loading-message").innerHTML = 'No items in database 😢, Click Add to get started 😊! <br/> Still Unsure? Click <i class="fas fa-book" aria-hidden="true"></i> Help';
    } else {
        try {


            document.getElementById("loading-message").innerHTML =  'Please bare with us, whilst we display your items! 🥳';
            
            let item_rows = '<tr>';
            await all_items.forEach(item => {
                let item_id = item.item_id
                // let market_price = 
                let image = item.image
                let title = item.title
                let price = item.price
                let variants = item.variants
                let market_price = 1234.56
                variants.forEach(variant_dict => {

                    let variant = variant_dict.variant
                    let active_inventory = variant_dict.active
                    let sold_inventory = variant_dict.sold
                    let date = new Date(variant_dict.date).toLocaleDateString("en-US")
                    item_rows += `<th scope="row">${item_id}</th>`
                    item_rows += `<td><img src="${image}" class="item-icon"></td>`
                    item_rows += `<td>${title}</td>`
                    item_rows += `<td>${variant}</td>`
                    item_rows += `<td>${active_inventory}</td>`
                    item_rows += `<td>${sold_inventory}</td>`
                    item_rows += `<td>$${price}</td>`
                    item_rows += `<td>$${market_price}</td>`
                    item_rows += `<td>$${(market_price* 100 - price* 100)/100}</td>` // solution of multiplying prices by 100 to make into an integer then subtract between integers then divide by 100 back to decimal value to avoid subtraction of integers issue.
                    item_rows += `<td>${date}</td></tr>`


                });
                
            });
            document.getElementById("items-table").innerHTML = item_rows;
            document.getElementById("loading-message").remove()
        } catch (error) {
            document.getElementById("loading-message").innerHTML =  `[${error}] Error displaying items 😭`;
        };
    };
};



updateDashboard()