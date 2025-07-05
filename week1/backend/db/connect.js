// db/connect.js
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

let _db;

export const initDb = async (callback) => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    const err = new Error('Missing MONGODB_URI or DB_NAME in environment variables');
    console.error(err);
    return callback(err);
  }

  if (_db) {
    console.log('Database already initialized');
    return callback(null, _db);
  }

  try {
    const client = await MongoClient.connect(uri);
    _db = client.db(dbName);
    console.log(`✅ Connected to MongoDB: ${dbName}`);
    callback(null, _db);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    callback(err);
  }
};

export const getDb = () => {
  if (!_db) {
    throw new Error('❌ Database not initialized. Call initDb first.');
  }
  return _db;
};

