## PLAN

## Backend

1. Set up a Node js Express server
2. Fetch data from Etherscan API
3. Retrieve the filter parameters from the request query string
4. Put data in a dataset - array of objects.
5. Filter array of objects based on the parameters we receive from the frontend using filter() to reduce the data and return reduced data to the frontend
    a) If the fromAddress filter is present and if it is, retrieve and store in the filteredTransactions variable
    b) If the toAddress filter is present and if it is, retrieve and store in the filteredTransactions variable 
    c) If the aboveValue filter is present and if it is, filter out transactions that are above the value in the argument
    d) If the aboveValue filter is present and if it is, filter out transactions that are below the value in the argument
    e) If the limit filter is present, use slice() method from the 0 index to the limit
    f) If the offset filter is present, use slice() method to define the start of the offset

6. Query the datasets in the GET api and return new result dataset with a status code 
7. If the data status is 0, return an error

## Frontend

1. Set up a React app
2. Create a Transactions Table component
3. Store filters in the state variables
4. Set filters as params in the get request
5. Add new filters to the state variable on Change 
6. Build several text boxes to specify filters
7. On Submit send a GET request to the backend with with all the given parameters given to the URL 
    a) save received trasactions to a state
    b) console.log the error if something goes wrong
8. Map through the array of transactions to display them in the table
9. Style the App with TailwindCSS
    a) add all the relevant colours to the app's theme in the tailwind.config file
10. Implement pagination

## Testing

1. Test the API with Supertest
    a) Make sure that the API call to Etherscan returns a list of transactions.
    b) Test the error handling.
    c) Test the filters
2. Test the Frotend
    a) UI Components: Testing the individual UI components in isolation.
    b) Data Loading
    c) Form Validation
    d) Error Handling: Testing how your app handles errors.