const mongoose = require('mongoose');

const mongoOptions = {
    user: "root",
    pass: "example"
}

mongoose.connect(`mongodb://${mongoOptions.user}:${mongoOptions.pass}@mongo:27017`);

console.log(mongoose);

const User = require("../models/User");

for (let i = 0; i < 20; i++) {
    let userReference = new User();
    userReference.email = `test${i}@test.com`;
    userReference.password = `trustNo1-${i}`;
    userReference.nickname = `Nick${i}`;
    userReference.save((err) => {
        if (err) {
            console.log(err);
        }
    });
}

