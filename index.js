const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//setup express app
const app = express();

//connect to mongodb
// mongoose.connect('mongodb:localhost/ninjago');
// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ninjago", { useNewUrlParser: true });
//For serving front end static files
app.use(express.static('public'));
///First Middleware
app.use(bodyParser.json());
//Second Middleware
app.use('/api',require('./routes/api'));
//Third Middleware
app.use((err,req,res,next)=>{
  res.status(422).send({error:err.message});
});

//listen for express
app.listen(process.env.port || 3000,()=>{
 console.log('now listening for Requests');
}); 

