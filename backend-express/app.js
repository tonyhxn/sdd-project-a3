const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000; // Whatever is in the environment variable PORT but if nothing is there use port 3000

// Database Connection
const mongoose = require('mongoose') // MongoDB module able to communicate between database and backend app
const uri = "mongodb+srv://admin_tony:e5IWZWuGoI8DPzWh@cluster0.i7z6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // Endpoint for connecting to database, contains database server details

mongoose.connect(uri, // Connect to mongo database via access uri
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }).then(
        () => console.log('MongoDB Atlas Connection: Connected') //  MongoDB Atlas Connection: Connected
    ).catch(
        error => console.log(`[Error] MongoDB Atlas Connection: ${error}`) // Catch error
    )

// Middlewares
app.use(cors());
app.use(express.json()); // Import middle ware request parser for json form data / request body.
// Able to handle form data sent with application/json type

// Routes (Backend APIs)

// Constructing a directory via /api/{route file imported from routes folder}
app.use('/api/', require('./routes/create')) // Importing exported module from the directory folder routes and file create.js
app.use('/api/', require('./routes/update')) // Importing exported module from the directory folder routes and file update.js
app.use('/api/', require('./routes/retrieve')) // Importing exported module from the directory folder routes and file retrieve.js

// This app starts a server and listens on PORT for connections.
app.listen(PORT, console.log(`Backend Express Server: Initiated on PORT ${PORT}`)); // Back tick string formatting, concatenating variable PORT into string displaying server connectivity status.