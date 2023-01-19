const express = require('express');
const { json, urlencoded } = express;
require('dotenv').config();
const { PORT } = require('./config/keys');
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: "You're welcome on Board to Twitee!" });
});

app.listen(PORT, () => {
  console.log(`Server now live at the port ${PORT}`);
});
