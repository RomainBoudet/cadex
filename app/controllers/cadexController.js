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

        // Dans le cas ou un utilisateur essaie d'altérer ma méthode glue..
        delete req.query.glue;

        if (req.query.hasOwnProperty('name')) {
            console.log(chalk.blue `Un nom a été inséré dans la query par l'utilisateur`);
        }

        if (req.query.hasOwnProperty('verb')) {
            console.log(chalk.blue `Un verbe a été inséré dans la query par l'utilisateur`);
        }
        if (req.query.hasOwnProperty('complement')) {
            console.log(chalk.blue `Un complément a été inséré dans la query par l'utilisateur`);
        }
        if (req.query.hasOwnProperty('adjective')) {
            console.log(chalk.blue `Un adjectif a été inséré dans la query par l'utilisateur`);
        }

        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.query
        };

        console.log(chalk.red `un cadex a été demandé !`);
        res.status(200).json(baseCadex.glue());
    },


    // 
    /**
     * Une méthode pour insérer des propostions de nom / verbe / adjectif ou complément a la factory
     * Retourne égalementun cadavre exquis utilidant les nouvelles propositions
     * @param {Express.Request} req - l'objet représentant la requête
     * @param {Express.Response} res - l'objet représentant la réponse
     */ 
    addproposition: (req, res) => {

        console.log(req.body); // J'accepte deux type de format : JSON et urlencoded. 

        cadexFactory.add(req.body);

        delete req.body.glue; // Petite sécurité..

        const baseCadex = {...cadexFactory.generate(), ...req.body}; // Je renvoie un cadex avec les propositions de l'utilisateur...

        res.status(200).json(baseCadex.glue());

    }





}

module.exports = cadexController;