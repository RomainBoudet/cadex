require('dotenv').config();
const chalk = require('chalk');
const spdy = require('spdy');
const fs = require('fs');

const express = require('express');

const app = express();

const port = process.env.PORT || 4040;

const router = require('./app/router');

app.use(express.json());

app.use('/api', router);

const options = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE),
}

spdy.createServer(options, app).listen(port, () => console.log(chalk.cyan `API running on https://localhost:${port}/api`));
