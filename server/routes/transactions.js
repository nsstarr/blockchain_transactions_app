const axios = require('axios');
const express = require('express');
const router = express.Router();

// Define a route to retrieve the transactions
router.get('/', async (req, res) => {
  // Define a data structure to store the transactions
  let transactions = [];

  // Handle the GET request for transactions
  try {
    //Retrieve the filter parameters from the request query string
    const { fromAddress, toAddress, aboveValue, belowValue, limit, offset } =
      req.query;
    // Define the Etherscan API URL and retrieve the API key from environment variables
    const apiUrl = 'https://api.etherscan.io/api';
    const apiKey = process.env.ETHERSCAN_API_KEY;

    const response = await axios.get(apiUrl, {
      params: {
        module: 'account',
        action: 'tokentx',
        contractaddress: '0x9355372396e3F6daF13359B7b607a3374cc638e0',
        page: 1,
        sort: 'asc',
        offset: 100,
        apikey: apiKey,
      },
    });

    // Store the transactions in memory
    transactions = response.data.result;

    // Apply filters
    let filteredTransactions = transactions;
    if (fromAddress) {
      filteredTransactions = filteredTransactions.filter(
        tx => tx.from === fromAddress,
      );
    }
    if (toAddress) {
      filteredTransactions = filteredTransactions.filter(
        tx => tx.to === toAddress,
      );
    }
    if (aboveValue) {
      filteredTransactions = filteredTransactions.filter(
        tx => +tx.value > +aboveValue,
      );
    }
    if (belowValue) {
      filteredTransactions = filteredTransactions.filter(
        tx => +tx.value < +belowValue,
      );
    }
    if (limit) {
      filteredTransactions = filteredTransactions.slice(0, +limit);
    }
    if (offset) {
      filteredTransactions = filteredTransactions.slice(+offset);
    }
    res.json(filteredTransactions);

    //Handle errors
    if (response.data.status === '0') {
      console.error(response.data.result);
      return res.status(404).json({ error: response.data.result });
    } else {
      return { status: 200, message: response.data };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
