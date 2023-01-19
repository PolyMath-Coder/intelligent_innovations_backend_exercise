const express = require('express');
const { json, urlencoded } = express;
const { connectToDatabase } = require('./config/mongoose');
require('dotenv').config();
const { PORT } = require('./config/keys');
const logger = require('./helpers/logger');
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: "You're welcome on Board to Twitee!" });
});

connectToDatabase();

app.listen(PORT, () => {
  logger.info(`Server now live at the port ${PORT}`);
});
