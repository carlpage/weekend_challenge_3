var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var port = process.env.PORT || 8000;

// globals
var pg = require('pg');
var config = {
  database: 'weekendChal3',
  host: 'localhost',
  port: 5432, // always use this port for localhost postgresql
  max: 12
};

var pool = new pg.Pool(config);

// static folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// spin up server
app.listen(port, function() {
  console.log('server up on', port);
});

// base url
app.get('/', function(req, res) {
  console.log('base url hit');
  res.sendFile('index.html');
});

app.get('/newTasks', function(req, res) {
  console.log('newTask url hit');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log(err);
      done();
      res.send(400);
    } else {
      console.log('connected to todo DB');
      var taskNames = [];
      var resultSet = connection.query("SELECT * FROM todoTable ORDER BY id ASC");
      resultSet.on('row', function(row) {
        taskNames.push(row);
      }); //end
      resultSet.on('end', function() {
        done();
        res.send(taskNames);
      });
    } // end no error
  }); // end pool connect
});

app.post('/register', function(req, res) {
  console.log('post hit to /register:', req.body);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log(err);
      done();
      res.send(400);
    } else {
      console.log('connected to db');
      console.log(req.body.task);
      connection.query("INSERT INTO todoTable ( task ) values ( $1 )", [req.body.taskName]);
      done();
      res.send(200);
    } // end no error
  }); // end pool connect
}); // end /register post

app.post('/newTasks', function(req, res) {
  console.log('Post hit');
  console.log(req.body);
  var id = req.body.id;
  console.log(id);
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error in connection', err);
      done();
      res.send(400);
    } else {
      connection.query("UPDATE todoTable SET complete = true WHERE" +
        " id = '" + id + "';");
      done();
      res.send('successful update');
    }
  });
});

// app.delete('/list', function(req, res) {
//   pool.connect(function(err, connection, done) {
//     console.log('Post hit');
//     console.log(req.body);
//     var id = req.body.id;
//     if (err) {
//       console.log('error in connection', err);
//       done();
//       res.send(400);
//     } else {
//       connection.query("DELETE FROM todoList WHERE (id = '" + id + "')");
//       res.send('deleted');
//     }
//   });
// });
