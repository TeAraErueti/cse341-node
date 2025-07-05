const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const app = express();

dotenv.config({ path: './week1/.env' });

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/', require('./routes')); 


mongodb.initDB((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
