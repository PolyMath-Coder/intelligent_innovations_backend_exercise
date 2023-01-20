const express = require('express');
const { json, urlencoded } = express;
const { connectToDatabase } = require('./config/mongoose');
const { errorConverter, errorHandler } = require('./helpers/asyncError');
const passport = require('passport');
require('dotenv').config();
const { PORT } = require('./config/keys');
const logger = require('./helpers/logger');
require('./auth/auth.service')(passport);
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', require('./routes/routes'));
app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: "You're welcome on Board to Twitee Index Page!" });
});

connectToDatabase();

app.use(errorConverter);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server now live at the port ${PORT}`);
});
