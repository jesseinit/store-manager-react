const express = require('express');
const path = require('path');
const log = require('fancy-log');

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, '/dist')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/dist/index.html')));

app.listen(port, () => log('Server Started'));
