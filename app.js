require('dotenv').config();
const chalk = require('chalk');
const helmet = require('helmet');
//const spdy = require('spdy');
//const fs = require('fs');

const express = require('express');
const router = require('./app/router');
const app = express();
const port = process.env.PORT || 4040;


//! Ma doc swagger pour l'API

const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = require('./swagger-config.json');
optionSwagger.basedir = __dirname;
optionSwagger.swaggerDefinition.host = `cadex-api.thedev.fr`;
expressSwagger(optionSwagger);


//! Mes MW pour l'API

//helmet : https://expressjs.com/fr/advanced/best-practice-security.html 
app.use (helmet()); // => source de [DEP0066] DeprecationWarning: OutgoingMessage.prototype._headers is deprecated

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'none'"],
      "style-src": null,
    },
  })
);


app.set('x-powered-by', false);

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), interest-cohort=(), fullscreen=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), document-domain=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), gamepad=(), gyroscope=(), layout-animations=(), legacy-image-formats=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), oversized-images=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), speaker-selection=(), sync-xhr=(), usb=(), screen-wake-lock=(), web-share=(), xr-spatial-tracking=()"
  );
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

// Je permet a mon API de lire les objets JSON rentrant 
app.use(express.json());
// Je permet a mon API de savoir lire les formats urlencoded
app.use(express.urlencoded());

// Je préfixe mes routes
app.use('/v1', router);

/**
 * Redirection vers une page 404
 */
 app.use((req, res) => {
    res.status(404).redirect('/api-docs');
  });

//! Mes options pour le serveur https
/* const options = {
  key: fs.readFileSync(process.env.SSL_KEY_FILE),
  cert: fs.readFileSync(process.env.SSL_CERT_FILE),
}


spdy.createServer(options, app).listen(port, () => console.log(chalk.cyan `API running on https://localhost:${port}`)); */
app.listen(port, () => console.log(chalk.cyan `API running on http://localhost:${port}/`));
