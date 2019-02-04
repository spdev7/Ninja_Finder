const express = require('express');

//setup exxpress app
const app = express();

app.get('/api',(req,res) => {
  console.log('GET Request');
  res.send({name : 'Yoshi'});  
});

//listen for express
app.listen(process.env.port || 3000,()=>{
 console.log('now listening for requests');
});

