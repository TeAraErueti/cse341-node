import { getDb } from '../db/connect.js';

export const getData = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection('user').findOne();
    console.log('Data fetched from DB:', data);
    if (!data) {
      return res.status(404).json({ message: 'No data found in user collection' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




