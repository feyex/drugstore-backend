// require('./config/config');
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  //use mongoose library to set up the database connection with MongoDB. We can also use Mongoose to save the data in the database using Mongoose ORM.
  mongoose = require('mongoose'), 
  config = require('./DB');
  require('./models/user.model');

const rtsIndex = require('./routes/index.router');
const businessRoute = require('./routes/business.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/business', businessRoute);
app.use('/api', rtsIndex);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});