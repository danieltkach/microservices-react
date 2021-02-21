const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const POSTS_SERVER = 'http://localhost:4000/events';
const COMMENTS_SERVER = 'http://localhost:4001/events';
const QUERY_SERVER = 'http://localhost:4002/events';

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post(COMMENTS_SERVER, event);
  axios.post(POSTS_SERVER, event);
  axios.post(QUERY_SERVER, event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Listening on 4005...'));
