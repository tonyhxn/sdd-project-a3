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

// Update dashboard function
// Includes rendering the table, updating prices displayed upon the cards
async function updateDashboard() {
    let all_items = await getItems()
    if (all_items.error == true) {
        document.getElementById("loading-message").innerHTML =  `[${all_items.response}] Error retrieving items from database 😭`;
    } else if (all_items == false) {
        document.getElementById("loading-message").innerHTML = 'No items in database 😢, Click Add to get started 😊! <br/> Still Unsure? Click <i class="fas fa-book" aria-hidden="true"></i> Help';
    } else {
        try {
            document.getElementById("loading-message").innerHTML =  'Please bare with us, whilst we display your items! 🥳';
            var items_table = '';
            var total_profit = '';
            var market_evaluation = '';
            var total_cost = '';
            var total_sold = '';

            await all_items.forEach(item => {
                console.log(item)
            });
            document.getElementById("items-table").innerHTML = '';
            document.getElementById("loading-message").remove()
        } catch (error) {
            document.getElementById("loading-message").innerHTML =  `[${error}] Error displaying items 😭`;
        };
    };
};

updateDashboard()