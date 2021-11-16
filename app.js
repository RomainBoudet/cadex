require('dotenv').config();
const chalk = require('chalk');
const fs = require('fs');
const helmet = require('helmet');

const express = require('express');
const router = require('./app/router');
const app = express();
const port = process.env.PORT || 4040;

//! Ma doc swagger

const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = require('./swagger-config.json');
optionSwagger.basedir = __dirname; // __dirname désigne le dossier du point d'entrée
optionSwagger.swaggerDefinition.host = `localhost:${port}`;
expressSwagger(optionSwagger);


//! Mes MW

//helmet : https://expressjs.com/fr/advanced/best-practice-security.html 
app.use (helmet()); // => source de [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated

// Je permet a mon API de lire les objets JSON rentrant 
app.use(express.json());
// Je permet a mon API de savoir lire les formats urlencoded
app.use(express.urlencoded());
// Je préfixe mes routes
app.use('/api/v1', router);


app.listen(port, () => console.log(chalk.cyan `API running on http://localhost:${port}/api`));

