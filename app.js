var express = require('express');
var todocontroller = require('./controllers/todocontroller');
// require('dotenv').config();
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//using static files
app.use(express.static('./public'));

//fire controllers 
todocontroller(app);

//listen to port
app.listen(3000);

console.log('you are listening to the port 3000');
