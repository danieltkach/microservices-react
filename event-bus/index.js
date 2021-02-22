const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const POSTS_SERVICE = 'http://localhost:4000/events';
const COMMENTS_SERVICE = 'http://localhost:4001/events';
const MODERATION_SERVICE = 'http://localhost:4003/events';
const QUERY_SERVICE = 'http://localhost:4002/events';

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(COMMENTS_SERVICE, event).catch((e) => console.log(e.message));
  axios.post(POSTS_SERVICE, event).catch((e) => console.log(e.message));
  axios.post(MODERATION_SERVICE, event).catch((e) => console.log(e.message));
  axios.post(QUERY_SERVICE, event).catch((e) => console.log(e.message));

  console.log('Event created:', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('(event-bus) Listening on 4005...'));
