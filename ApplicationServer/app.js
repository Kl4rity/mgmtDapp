const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('short'));

const mongoOptions = {
    user : "root",
    pass : "example"
}

mongoose.connect(`mongodb://${mongoOptions.user}:${mongoOptions.pass}@mongo:27017`);

const User = require("./models/User");

app.use('/', (req,res)=>{
    User.find({}).then((value)=>{
        res.json(value);
    });
});

app.listen(port);
console.log(`Server started on port ${port}.`);