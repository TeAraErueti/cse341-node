const dotenv = require('dotenv');
dotenv.config({ path: './week1/.env' }); 

const MongoClient= require('mongodb').MongoClient;

let database;

const initDB = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
        }
        MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
           callback(null, database);
        })
        .catch((err) => {
            console.log(err);
            callback(err, null);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized')
    }
    return database;
};

module.exports = {
    initDB,
    getDatabase
};