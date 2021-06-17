const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Whatever is in the environment variable PORT but if nothing is there use port 3000

// Database Connection
const mongoose = require('mongoose') // MongoDB module able to communicate between database and backend app
const uri = "mongodb+srv://admin_tony:e5IWZWuGoI8DPzWh@cluster0.i7z6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; // Endpoint for connecting to database, contains database server details

mongoose.connect(uri,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }).then(
        () => console.log('MongoDB Atlas Connection: Connected')
    ).catch(
        error => console.log(`[Error] MongoDB Atlas Connection: ${error}`)
    )

// Middlewares
app.use(express.urlencoded( {extended: true} ));

// Routes (Backend APIs)

// Constructing a directory via /api/{routes imported from module}
app.use('/api/', require('./routes/index')) // Importing exported module from the directory folder routes and file index.js

// This app starts a server and listens on PORT for connections.
app.listen(PORT, console.log(`Backend Express Server: Initiated on PORT ${PORT}`)); // Back tick formatting, concatenating variable PORT into string displaying server connectivity status.