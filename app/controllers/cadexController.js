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

        // je génére une copie de mon cadex et req.query peut contenir des morceaux de cadex décidé par l'utilisateur. 
        // potentiellement un verb, un name, un adjective, un complement
        // Et si il y a deux clés identiques, la deuxieme écrasse la premiére, celle donné par l'utilisateur prend donc le dessus !

        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.query
        };

        console.log(chalk.red `un cadex a été demandé !`);
        res.status(200).json(baseCadex.glue());
    }

}

module.exports = cadexController;