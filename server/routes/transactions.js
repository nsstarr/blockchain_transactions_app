const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  let transactions = [];

  try {
    const { fromAddress, toAddress, aboveValue, belowValue, limit, offset } =
      req.query;
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

    transactions = response.data.result;

    let filteredTransactions = transactions;
  
      function checkFilters (transactions) {
      let passFilters = true
      if (fromAddress) {
       if (transactions.from !== fromAddress) {
        passFilters = false
       }
      } 
      if (toAddress) {
        if (transactions.to !== toAddress) {
        passFilters = false
       }
      }
      if (aboveValue) {
       if (transactions.aboveValue < +aboveValue) {
        passFilters = false
       }
      }
      if (belowValue) {
       if (transactions.aboveValue > +aboveValue){
        passFilters = false
       }
      }
      return passFilters
      }

    filteredTransactions = transactions.filter(checkFilters)

    filteredTransactions = filteredTransactions.slice(0, +limit)

    filteredTransactions = filteredTransactions.slice(+offset)



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
