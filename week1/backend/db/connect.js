import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

let _db;

export const initDb = (callback) => {
  if (_db) {
    console.log('Database already initialized');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db(process.env.DB_NAME);
      console.log('Connected to MongoDB');
      callback(null, _db);
    })
    .catch((err) => {
      console.error(err);
      callback(err);
    });
};

export const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};
