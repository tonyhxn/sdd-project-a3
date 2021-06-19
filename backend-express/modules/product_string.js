async function generateItemId() {
    try {
        await console.log('Generating item id...')
        var item_id = '' // Define empty string for item id
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Define characters used in item id string
        for (let i = 0; i < 12; i++) { // Generating a 12 alphanumeric character string
            random_index = Math.floor(Math.random() * characters.length) // Randomly generates an index within the length of the characters string
            item_id += characters[random_index] // Concatenate product_id string with new character from characters based off the index
        }
        await console.log(`[${item_id}] Generated item id`)
        return item_id
    } catch (error) {
        console.log('Error generating item id') // Error handling incase function does not work, able to identify bug is derived from this part of the code.
    }

};

module.exports = generateItemId; // export as function