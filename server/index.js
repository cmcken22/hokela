const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const config = require('./config');
const routes = require('./routes');

const app = express();
const server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', express.static(path.join(__dirname, 'public')));
// app.use('/causes', express.static(path.join(__dirname, 'public')));
app.use('/', express.static('public'));
app.use('/causes', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/healthz', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'unconditionally healthy'
  });
});

app.use('/', routes());
app.use('/causes', routes());

app.use(express.static(`${__dirname}./../`));

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
