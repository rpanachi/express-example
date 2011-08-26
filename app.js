/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

require('./array.js');

GLOBAL.app = app;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.set('db_name', 'todo_development');
  app.set('db_username', 'root');
  app.set('db_password', 'root');

  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true 
  })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Models

require('./models.js');

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/tasks', function(req, res){
    Task.findAll().on('success', function(tasks) {
        pendingTasks = tasks.select(function(task) {
            return !task.closed;
        });
        res.render('tasks', {
            title: 'Listing tasks',
            tasks: pendingTasks
        });
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
