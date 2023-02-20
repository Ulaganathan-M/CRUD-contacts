
const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()

connectDb()

const app = express()

//it is used for getting information from user in json format
app.use(express.json());

app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler);







app.listen(3000, () => console.log('listening on port 3000...'));
