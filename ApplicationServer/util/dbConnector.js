const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoOptions = {
    user: "root",
    pass: "example",
    container_name: "mongo",
    port: "27017"
}

const connectionString = `mongodb://${mongoOptions.user}:${mongoOptions.pass}@${mongoOptions.container_name}:${mongoOptions.port}`;

module.exports = {
    establishDbConnection : () => {
        console.log(connectionString);
        // Not pretty. How can I get this reference cleaner?
        mongoose.connect(connectionString);
    },
    getSessionStore : () => {
        store = new MongoStore({mongooseConnection: mongoose.connection});
        return store;
    }
}