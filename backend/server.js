// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser'; //req body
import logger from 'morgan';
import mongoose from 'mongoose'; //ODM interact with our db

import { getSecret } from './configs/secrets';
import router from './routes/api/items';

const app = express();
//const router = express.Router();

// set our port to either a predetermined port number 
//if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
mongoose
  .connect(getSecret('dbUri'),{ useNewUrlParser: true })
  .then(()=>console.log('MongoDB Connected !'))
  .catch(err => console.log(err));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Bodyparser middleware
/*now we should configure the API to use bodyParser
and look  for JSON data in the request body*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));