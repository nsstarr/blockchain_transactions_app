const axios = require('axios');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const transactionsRouter = require('./routes/transactions');

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/api/transactions', transactionsRouter);

app.get('/', function (req, res) {
  res.json({
    success: true,
    message: 'Test route up and running!',
  });
});

app.listen(PORT, error => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + PORT,
    );
  else console.log("Error occurred, server can't start", error);
});
