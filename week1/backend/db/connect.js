<<<<<<< HEAD
=======
// db/connect.js
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

let _db;

<<<<<<< HEAD
export const initDb = (callback) => {
=======
export const initDb = async (callback) => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    const err = new Error('Missing MONGODB_URI or DB_NAME in environment variables');
    console.error(err);
    return callback(err);
  }

>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
  if (_db) {
    console.log('Database already initialized');
    return callback(null, _db);
  }

<<<<<<< HEAD
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
=======
  try {
    const client = await MongoClient.connect(uri);
    _db = client.db(dbName);
    console.log(`✅ Connected to MongoDB: ${dbName}`);
    callback(null, _db);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    callback(err);
  }
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
};

export const getDb = () => {
  if (!_db) {
<<<<<<< HEAD
    throw new Error('Database not initialized');
  }
  return _db;
};
=======
    throw new Error('❌ Database not initialized. Call initDb first.');
  }
  return _db;
};

>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
