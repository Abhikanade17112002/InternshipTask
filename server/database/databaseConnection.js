//  Asynchronous Function To Connect Data Base
//  Returns a Promise
//  Resolves with Connection Object

const mongoose = require('mongoose');

const connectToDaqtbase = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_CONNECTION_URI);

        console.log(`MongoDB Connected SuccesFully: ${connection.connection.host}`);
        
        return connection;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};


module.exports = connectToDaqtbase;
