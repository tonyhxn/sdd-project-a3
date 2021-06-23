const deleteItemForm = document.getElementById('delete-item-form');
deleteItemForm.addEventListener('submit', function(event){ // On submit event listner 
    event.preventDefault(); // Prevent page from reloading when submitting form
    let request_body = {}
    var formData = new FormData(deleteItemForm)
    for (const [key, value] of formData.entries()){
        request_body[key] = value; // Should only be item_id: item_id
    };

    fetch('http://localhost:3000/api/delete', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request_body)
    }).then( (resp) => {location.reload()} ); // refreshing page, rendering the new table
})