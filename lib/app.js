const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/actors', require('./controllers/actors.js'));
app.use('/api/studios', require('./controllers/studios.js'));
app.use('/api/films', require('./controllers/films.js'));
app.use('/api/reviewers', require('./controllers/reviewers.js'));
app.use('/api/reviews', require('./controllers/reviews.js'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
