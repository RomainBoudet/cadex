
const cadexFactory = require('../services/cadexFactory');
const chalk = require('chalk');
/**
 * Le controller chargé de centraliser les MW concernant les cadavres exquis
 */
const cadexController = {

/**
 * MW chargé de générer un cadavre exquis
 * L'utilisateur pourra fournir des morceaux dans la query string
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
    getCadex: (req, res) => {

        console.log(chalk.red`un cadex a été demandé !`);
        res.status(200).json(cadexFactory.generate().glue());
    }

}

module.exports = cadexController;