import { getDb } from '../db/connect.js';

export const getData = async (req, res) => {
  try {
<<<<<<< HEAD
    const data = await getDb().collection('professional').findOne({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
=======
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
>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
  }
};



<<<<<<< HEAD
=======

>>>>>>> 8e63b264be23e7b4ca560df7938d66d0893645b9
