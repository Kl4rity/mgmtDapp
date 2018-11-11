const User = require('../models/User').User;

// Connect to DB.
require('../util/dbConnector')();

const seedDb = () => {
    for (let i = 0; i < 20; i++) {
    let userReference = new User();
    userReference.email = `test${i}@test.com`;
    userReference.username = `Nick${i}`;
    userReference.save((err) => {
        if (err) {
            console.log(err);
        }
    });
}
}

module.exports.seedDb = seedDb;

// If it is run as a script, execute the function here:
(async function checkIfDbIsSeeded(){
    let users = await User.find();
    if (users.length < 1){
        seedDb();
    }
}())