const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const POSTS_SERVICE = 'http://localhost:4000/events';
const COMMENTS_SERVICE = 'http://localhost:4001/events';
const QUERY_SERVICE = 'http://localhost:4002/events';
const MODERATION_SERVICE = 'http://localhost:4003/events';

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(COMMENTS_SERVICE, event);
  axios.post(POSTS_SERVICE, event);
  axios.post(QUERY_SERVICE, event);
  axios.post(MODERATION_SERVICE, event);

  res.send({ status: 'OK' });
});

app.get('/', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('(event-bus) Listening on 4005...'));
