import fileUpload from 'express-fileupload';
import {
  getAllMock,
  getSingleMockRequest,
  getSingleMockResponse,
} from './mock';

const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');

const normalLimiter = rateLimit({
  windowMs: 60 * 1000, // millisecond
  max: 300, // Limit each IP to n requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const frequentLimiter = rateLimit({
  windowMs: 60 * 1000, // minute
  max: 1000, // Limit each IP to n requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests

if (process.env.NODE_ENV == 'production') {
  app.use(normalLimiter);
}

const newsRouter = require('./router/news');
const accountRouter = require('./router/account');
const searchRouter = require('./router/search');
const tokenRouter = require('./router/token');
const taskRouter = require('./router/task');
const bannerRouter = require('./router/banner');
const gameRouter = require('./router/game');
const eventRouter = require('./router/event');
const genreRouter = require('./router/genre');
const threadRouter = require('./router/thread');
const reviewRouter = require('./router/review');
const hubRouter = require('./router/hub');
const pageRouter = require('./router/page');
const verifyRouter = require('./router/verify');
const uploadRouter = require('./router/upload');
const discoverRouter = require('./router/discover');

app.use(fileUpload());
const helmet = require('helmet');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (
  process.env.MODE != null &&
  process.env.MODE != undefined &&
  process.env.MODE != 'prod' &&
  process.env.MODE != 'production'
) {
  app.get('/all-api', (req, res) => {
    res.json(getAllMock());
  });
  app.get('/all-api/request/:key', (req, res) => {
    res.json({ data: getSingleMockRequest(req.params.key) });
  });
  app.get('/all-api/response/:key', (req, res) => {
    res.json({ data: getSingleMockResponse(req.params.key) });
  });
}

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('/news', newsRouter);
app.use('/account', accountRouter);
app.use('/search', searchRouter);
app.use('/tokens', tokenRouter);
app.use('/tasks', taskRouter);
app.use('/banners', bannerRouter);
app.use('/games', gameRouter);
app.use('/events', eventRouter);
app.use('/genres', genreRouter);
app.use('/reviews', reviewRouter);
app.use('/threads', threadRouter);
app.use('/hubs', hubRouter);
app.use('/pages', pageRouter);
app.use('/verify', verifyRouter);
app.use('/upload', uploadRouter);
app.use('/discover', discoverRouter);

export default {
  path: '/api',
  handler: app,
};
