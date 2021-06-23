const updateItemForm = document.getElementById('update-item-form');
updateItemForm.addEventListener('submit', function(event){ // On submit event listner 
    event.preventDefault(); // Prevent page from reloading when submitting form
    let request_body = {}
    var formData = new FormData(updateItemForm)
    for (const [key, value] of formData.entries()){
        if (key == 'variants') { // special case for variants, reformatting variants from string to array
            var variants = [];
            let raw_variants = value.trim().split(',') // Converting variant:active:sold,variant:active:sold into [variant:active:sold, variant:active:sold]
            for (let raw_variant of raw_variants){
                let raw_variant_array = raw_variant.trim().split(':'); // Splitting variant:active:sold into [variant, active, sold]
                variants.push({
                    variant: raw_variant_array[0], // Will correspond to variant in array after splitting if user input followed format
                    active: parseInt(raw_variant_array[1]), // Will correspond to active in array after splitting if user input followed format
                    sold: parseInt(raw_variant_array[2]) // Will correspond to sold in array after splitting if user input followed format
                });
            };
            request_body["variants"] = variants;
        } else {
            request_body[key] = value;
        };
    };

    fetch('http://localhost:3000/api/update', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_body)
    }).then( (resp) => {location.reload()} ); // refreshing page, rendering the new table
})