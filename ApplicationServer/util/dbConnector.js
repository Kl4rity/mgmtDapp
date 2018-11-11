const mongoose = require('mongoose');

const mongoOptions = {
    user: "root",
    pass: "example",
    container_name: "mongo",
    port: "27017"
}

module.exports = () => {
        // Not pretty. How can I get this reference cleaner?
        mongoose.connect(`mongodb://${mongoOptions.user}:${mongoOptions.pass}@${mongoOptions.container_name}:${mongoOptions.port}`);
    }