require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const Authentication = require('./Routers/Authentication');
const User = require('./Routers/User');
const Friends = require('./Routers/Friends');
const Message = require('./Routers/Message');
const Conversation = require('./Routers/Conversation');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

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
  res.status(200).json({
    Message: 'Welcome! Convo API ',
  });
});

app.use('/api', Authentication);
app.use('/api', User);
app.use('/api', Friends);
app.use('/api', Message);
app.use('/api', Conversation);

app.listen(process.env.PORT, () => {
  console.log('SEVER CONNECTED');
});
