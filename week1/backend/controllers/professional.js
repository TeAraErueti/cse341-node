import { getDb } from '../db/connect.js';

export const getData = async (req, res) => {
  try {
    const db = getDb();

    // Ensure collection name matches what's in MongoDB (e.g., "users" not "user")
    const data = await db.collection('users').find().toArray();

    console.log('Data fetched from DB:', data);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No data found in users collection' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



