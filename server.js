//Bringing the express framework and store it in a constant
const express = require("express");

//Initializing the express framework and saving it into another constant
const app = express();

/*Defining GET HTTP method to send a json response when 
a GET request is made to the homepage*/
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Osiris' server" });
});

/*
Check environment variables to see if there is a PORT already defined
If not, it will use PORT 8080
*/
const PORT = process.env.PORT || 8080;

//
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
