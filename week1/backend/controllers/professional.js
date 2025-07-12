import { getDb } from '../db/connect.js';

export const getData = async (req, res) => {
  try {
    const data = await getDb().collection('professional').findOne({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



