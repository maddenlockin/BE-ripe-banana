const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/actors', require('./controllers/actor.js'));
app.use('/api/studios', require('./controllers/studio.js'));
app.use('/api/films', require('./controllers/film.js'));
app.use('/api/reviewers', require('./controllers/reviewer.js'));
app.use('/api/reviews', require('./controllers/review.js'));


app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
