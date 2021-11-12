require('dotenv').config();
const chalk = require('chalk');
const spdy = require('spdy'); // source de => [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
const fs = require('fs');
const helmet = require('helmet');

const express = require('express');

const app = express();

const port = process.env.PORT || 4040;

//helmet : https://expressjs.com/fr/advanced/best-practice-security.html 
app.use (helmet()); // => source de [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated

const router = require('./app/router');

app.use(express.json());

app.use('/api', router);


const options = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE),
}


spdy.createServer(options, app).listen(port, () => console.log(chalk.cyan `API running on https://localhost:${port}/api`));

