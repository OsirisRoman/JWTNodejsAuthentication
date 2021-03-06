//Bringing the express framework and store it in a constant
const express = require("express");

//body-parser helps to parse the request and create the req.body object
const bodyParser = require("body-parser");
//Allows the web app to obtain data from another server
const cors = require("cors");

//Initializing the express framework and saving it into another constant
const app = express();

//We specifies the unique origin that can request to this server
let corsOptions = {
    origin: "http://localhost:8081",
};

//Allows requests only from specific origin (corsOption.origin)
app.use(cors(corsOptions));

//This will parse the requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.json());

//Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and Resync Db");
    initial();
});

//A function to create 3 rows in the database
function initial() {
    Role.create({
        id: 1,
        name: "user",
    });

    Role.create({
        id: 2,
        name: "moderator",
    });

    Role.create({
        id: 3,
        name: "admin",
    });
}

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

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

//Make our server listen on our previous specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
