function validate_var(variants, type) {
    for (var i= 0; i < variants.length; i++) { // iterate through variants
        const { variant, active, sold, date } = variants[i]
        if ( !variant || !active || !sold) { // Validate the data, that data has variant, active, sold
            return true // Data doesn't include one of: variant, active, sold, return true for invalid input
        } else if (type == 'update')  { // if type of api checking the variant is update, check for date too. 
            if (!date) {
                return true // Data doesn't include date, return true for invalid input
            }
        }
    };

};

module.exports = validate_var;