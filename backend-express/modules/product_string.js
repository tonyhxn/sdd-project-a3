function generateProductId() {
    try {
        console.log('Generating product id...')
        var product_id = '' // Define empty string for product id
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Define characters used in product id string
        for (var i = 0; i < 12; i++) { // Generating a 12 alphanumeric character string
            random_index = Math.floor(Math.random() * characters.length) // Randomly generates an index within the length of the characters string
            product_id += characters[random_index] // Concatenate product_id string with new character from characters based off the index
        }
        console.log(`Generated product id [${product_id}]`)
        return product_id
    } catch (error) {
        console.log('Error generating product id') // Error handling incase function does not work, able to identify bug is derived from this part of the code.
    }

};

module.exports = generateProductId;