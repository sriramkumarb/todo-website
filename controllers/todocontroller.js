 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');

 //connect to database
 mongoose.connect('mongodb+srv://sri:12345@cluster0-msx9w.mongodb.net/test?retryWrites=true&w=majority');

 //create a schema - this is like a blue print
 var todoSchema = new mongoose.Schema({
     item:String
 });

//create a model
var Todo = mongoose.model('Todo',todoSchema);

//inserting one value in  database
// var itemOne = Todo({item: 'make coffee'}).save(function (err) {
//     if (err) throw err;
//     console.log('item saved successfully');
// });

//  var data = [{item:'Get Milk'},{item:'Fill Fuel'},{item:'Buy a newspaper'}];

 var urlencodedParser = bodyParser.urlencoded({extended:false});
 
 module.exports = function (app) {
    
    app.get('/todo' , function (req , res) {
        // get data from mongodb and pass it to view
        Todo.find({},function (err,data) {
            if (err) throw err;
            res.render('todo',{todos: data});
        });

        // res.render('todo',{todos:data});  
    });

    app.post('/todo' , urlencodedParser, function (req , res) {
        // get data from the view and add it to the mongodb
        var newTodo = Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json({todos:data});
        });

        // data.push(req.body);
        // console.log(req.body);
        // res.json({todos:data});
    });

    app.delete('/todo/:item' , function (req , res) {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function (err,data) {
            if (err) throw err;
            res.json({todos:data});
        });

        // data = data.filter(function (todo) {
        //    return todo.item.replace(/ /g, '-') !== req.params.item; 
        // });
        // res.json({todos:data})
    });

};