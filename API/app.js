const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const verify = require('./routes/verifytoken');

app.use(bodyParser.json());
app.use(cors());

// IMPORT ROUTES
const postsRoute = require('./routes/posts');
const sportsRoute = require('./routes/sports');
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/images');

// MIDDLEWARES
app.use('/api/posts', postsRoute);
app.use('/api/sports', sportsRoute);
app.use('/api/user', authRoute);
app.use('/api/images', imageRoute);

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to db'));

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to ovs API');
});

// PORT
app.listen(3030);
