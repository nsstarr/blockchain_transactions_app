import './index.css';
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
    <>
      <img
        src='../public/logo-white.png'
        alt='Company Logo'
        className='h-8 my-3 m-4 p-1'
      />
      <div className='font-display text-primary container mx-10 flex flex-col'>
        <h1 className='text-4xl tracking-tight font-bold text-primary my-10'>
          Blockchain Transactions
        </h1>

        <form
          onSubmit={handleFilterSubmit}
          className='border-gray border-2 p-8 rounded-lg'
        >
          <div
            className='flex justify-around
        '
          >
            <div className='flex items-center mb-3 flex-col'>
              <p className='text-lg font-bold text-secondary my-3'>
                Contract Address Information
              </p>
              <label className='text-md font-medium mb-2'>From Address:</label>
              <input
                type='text'
                name='fromAddress'
                value={filters.fromAddress}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              <label className='text-md font-medium mb-2 '>To Address:</label>
              <input
                type='text'
                name='toAddress'
                value={filters.toAddress}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
            </div>
            <div className='flex flex-col items-center mb-3'>
              <p className='text-lg font-bold text-secondary my-3'>
                Contract Address Value
              </p>
              <label className='text-md font-medium mb-2'>Above Value:</label>
              <input
                type='text'
                name='aboveValue'
                value={filters.aboveValue}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              {errors.aboveValue && <p>{errors.aboveValue}</p>}

              <label className='text-md font-medium mb-2'>Below Value:</label>
              <input
                type='text'
                name='belowValue'
                value={filters.belowValue}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              {errors.belowValue && <p>{errors.belowValue}</p>}
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-lg font-bold text-secondary my-3'>
                Page Display
              </p>
              <label className='text-md font-medium mb-2'>Limit:</label>
              <input
                type='number'
                name='limit'
                value={filters.limit}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              <label className='text-md font-medium mb-2'>Offset:</label>
              <input
                type='number'
                name='offset'
                value={filters.offset}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
            </div>
          </div>
          <div className='flex justify-center'>
          <button
            className='bg-button hover:opacity-80 font-semibold text-white px-8 py-2 rounded-lg mt-4 hover:bg-primary-dark'
            type='submit'
          >
            Apply Filters
          </button>
          </div>
        </form>
        <table className='border-2 border-gray mt-10'>
          <thead className=''>
            <tr className='text-secondary'>
              <th className='text-lg py-2 px-4 md:px-6 lg:px-8'>From</th>
              <th className='text-lg py-2 px-4 md:px-6 lg:px-8'>To</th>
              <th className='text-lg py-2 px-4 md:px-6 lg:px-8'>Value</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className='text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
                  {transaction.from}
                </td>
                <td className='text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
                  {transaction.to}
                </td>
                <td className='text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
                  {transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;
