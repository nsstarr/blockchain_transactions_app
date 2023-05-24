
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;


// const fetchData = async () => {
//     //fetch data from etherscan
//      const response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractaddress}&page=1&sort=asc&apikey=TQ195E597SDA6AC5FPGR2419VCKDUKJ6P9`)
//         const data = await response.data
//         console.log(data)

//         // const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractaddress}&page=1&sort=asc&apikey=TQ195E597SDA6AC5FPGR2419VCKDUKJ6P9`)
//         // const data = await response.json()
//         // console.log(data)
//     }

/* 

What you receive from the frontend 

const filter = {

  address: 'England',

  name: 'Mark'

};

 

var users = [{

    name: 'John',

    email: 'johnson@mail.com',

    age: 25,

    address: 'USA'

  },

  {

    name: 'Tom',

    email: 'tom@mail.com',

    age: 35,

    address: 'England'

  },

  {

    name: 'Mark',

    email: 'mark@mail.com',

    age: 28,

    address: 'England'

  }

];

 

 

users = users.filter(transaction) => {

  for (const key in filter) {

    if (transaction[key] === undefined || transaction[key] != filter[key])

      return false;

  }

  return true;

});
*/



  
app.get('/', (req, res)=>{
    res.status(200);
    const {contractaddress} = req.query
    const fetchData = async () => {
    //fetch data from etherscan
     const response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractaddress}&page=1&sort=asc&apikey=TQ195E597SDA6AC5FPGR2419VCKDUKJ6P9`)
        const data = await response.data
        console.log(data)
    }
    fetchData()

});

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);