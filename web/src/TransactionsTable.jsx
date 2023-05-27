import './index.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    fromAddress: '',
    toAddress: '',
    aboveValue: '',
    belowValue: '',
    limit: '',
    offset: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/transactions',
        {
          params: filters,
        },
      );
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //Validate inputs of aboveValue and belowValue filters
  const validateInputs = () => {
    const newErrors = {};
    if (filters.aboveValue && isNaN(filters.aboveValue)) {
      newErrors.aboveValue = 'Value must be a number';
    }
    if (filters.belowValue && isNaN(filters.belowValue)) {
      newErrors.belowValue = 'Value must be a number';
    }
    setErrors(newErrors);
    //The function checks if the newErrors object is empty by getting its keys using Object.keys and checking if the length of the keys array is 0. 
    return Object.keys(newErrors).length === 0;
  };

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = e => {
    e.preventDefault();
    if (validateInputs()) {
      fetchData();
    }
  };

  return (
    <div>
      <h1 className='text-red-400'>Blockchain Transactions</h1>

      <form onSubmit={handleFilterSubmit}>
        <label>From Address:</label>
        <input
          type='text'
          name='fromAddress'
          value={filters.fromAddress}
          onChange={handleFilterChange}
        />

        <label>To Address:</label>
        <input
          type='text'
          name='toAddress'
          value={filters.toAddress}
          onChange={handleFilterChange}
        />

        <label>Above Value:</label>
        <input
          type='text'
          name='aboveValue'
          value={filters.aboveValue}
          onChange={handleFilterChange}
        />
        {errors.aboveValue && <p>{errors.aboveValue}</p>}

        <label>Below Value:</label>
        <input
          type='text'
          name='belowValue'
          value={filters.belowValue}
          onChange={handleFilterChange}
        />
        {errors.belowValue && <p>{errors.belowValue}</p>}
        <label>Limit:</label>
        <input
          type='number'
          name='limit'
          value={filters.limit}
          onChange={handleFilterChange}
        />

        <label>Offset:</label>
        <input
          type='number'
          name='offset'
          value={filters.offset}
          onChange={handleFilterChange}
        />

        <button type='submit'>Apply Filters</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.from}</td>
              <td>{transaction.to}</td>
              <td>{transaction.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
