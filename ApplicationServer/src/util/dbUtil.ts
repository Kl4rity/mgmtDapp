import * as mongoose from 'mongoose';

const DBService = {
    mongoOptions : {
        user: "root",
        pass: "example",
        container_name: "mongo",
        port: "27017"
    },
    connect : () => {
        // Not pretty. How can I get this reference cleaner?
        mongoose.connect(`mongodb://${DBService.mongoOptions.user}:${DBService.mongoOptions.pass}@${DBService.mongoOptions.container_name}:${DBService.mongoOptions.port}`);
    }
}

export default DBService;