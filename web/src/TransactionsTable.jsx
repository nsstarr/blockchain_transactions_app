import './index.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

//component imports
import Navbar from './components/Navbar';
import ClearCacheButton from './components/ClearCacheButton';

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
    const cachedTransactions = localStorage.getItem('transactions');
    if (cachedTransactions) {
      setTransactions(JSON.parse(cachedTransactions));
    } else {
      fetchData(); // Fetch transactions if not found in cache
    }
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
      localStorage.setItem('transactions', JSON.stringify(response.data));
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
      <Navbar />
      <div className='font-display text-primary mx-28 flex flex-col'>
        <h1 className='text-4xl tracking-tight font-bold text-center hover:underline text-primary my-10'>
          Blockchain Transactions
        </h1>

        <form onSubmit={handleFilterSubmit} className=' p-8 rounded-lg'>
          <div
            className='flex justify-around
        '
          >
            <div className='flex items-center mb-3 flex-col'>
              <p className='text-lg font-semibold text-primary my-3 tracking-tight'>
                Contract Address Information
              </p>
              <label htmlFor='fromAddress' className='text-md font-medium mb-2'>From Address:</label>
              <input
                type='text'
                name='fromAddress'
                id='fromAddress'
                value={filters.fromAddress}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              <label htmlFor='toAddress' className='text-md font-medium mb-2 '>To Address:</label>
              <input
                type='text'
                name='toAddress'
                id='toAddress'
                value={filters.toAddress}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
            </div>
            <div className='flex flex-col items-center mb-3'>
              <p className='text-lg font-semibold text-primary my-3 tracking-tight'>
                Contract Address Value
              </p>
              <label htmlFor='aboveValue' className='text-md font-medium mb-2'>Above Value:</label>
              <input
                type='text'
                name='aboveValue'
                id='aboveValue'
                value={filters.aboveValue}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              {errors.aboveValue && <p>{errors.aboveValue}</p>}

              <label htmlFor='belowValue' className='text-md font-medium mb-2'>Below Value:</label>
              <input
                type='text'
                id='belowValue'
                name='belowValue'
                value={filters.belowValue}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
              {errors.belowValue && <p>{errors.belowValue}</p>}
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-lg font-semibold text-primary my-3 tracking-tight'>
                Page Display
              </p>
              <label htmlFor='limit' className='text-md font-medium mb-2'>Limit:</label>
              <input
                type='number'
                id='limit'
                name='limit'
                value={filters.limit}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg bg-none'
              />
              <label htmlFor='offset' className='text-md font-medium mb-2'>Offset:</label>
              <input
                type='number'
                id='offset'
                name='offset'
                value={filters.offset}
                onChange={handleFilterChange}
                className='m-1 p-1 border border-gray rounded-lg'
              />
            </div>
          </div>
          <div className='flex justify-center space-x-2'>
            <button
              className='bg-button hover:opacity-80 font-medium text-white px-8 py-2 rounded-lg mt-4 hover:bg-primary-dark tracking-tighter'
              type='submit'
            >
              Apply Filters
            </button>
            <ClearCacheButton/>
          </div>
        </form>
        <table className='border-2 border-gray mt-10 bg-white mb-10'>
          <thead className='border-2 border-gray border-1.5'>
            <tr className='text-primary tracking-tight '>
              <th className='text-lg py-2 px-4 border-2 border-gray md:px-6 lg:px-8'>
                From
              </th>
              <th className='text-lg py-2 px-4 border-2 border-gray md:px-6 lg:px-8'>
                To
              </th>
              <th className='text-lg py-2 px-4 border-2 border-gray md:px-6 lg:px-8'>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className='border-2 border-gray text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
                  {transaction.from}
                </td>
                <td className='border-2 border-gray text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
                  {transaction.to}
                </td>
                <td className=' border-2 border-gray text-center py-2 px-4 md:px-6 lg:px-8 text-sm'>
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
