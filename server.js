require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const Authentication = require('./Routers/Authentication');
const Messages = require('./Routers/Messages');
const User = require('./Routers/User');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DATABASE CONNECTED');
  });

app.get('/', (req, res) => {
  res.json('HELLO there!');
});

app.use('/api', Authentication);
app.use('/api', Messages);
app.use('/api', User);

app.listen(process.env.PORT, () => {
  console.log('SEVER CONNECTED');
});
