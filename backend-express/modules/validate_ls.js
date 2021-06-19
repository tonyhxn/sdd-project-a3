function validate_ls(variants) {
    for (var i= 0; i < variants.length; i++) {
        listing_status = variants[i].listing_status
        if (listing_status !== 'Sold' && listing_status !==  'Active') { // Validate the data, that listing status only has two inputs (sold/active)
            return true // Data doesn't match sold or active, return true for invalid input
        } else {
            // console.log('Valid field')
        }
    };

};

module.exports = validate_ls;