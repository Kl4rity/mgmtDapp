import * as mongoose from 'mongoose';

// TODO: Singleton statt einem const?
// AppDependencyManager in App.ts?
// this immer weitergeben?

const DBConnector = {
    mongoOptions : {
        user: "root",
        pass: "example",
        container_name: "mongo",
        port: "27017"
    },
    connect : () => {
        // Not pretty. How can I get this reference cleaner?
        mongoose.connect(`mongodb://${DBConnector.mongoOptions.user}:${DBConnector.mongoOptions.pass}@${DBConnector.mongoOptions.container_name}:${DBConnector.mongoOptions.port}`);
    }
}

export default DBConnector;