const cadexFactory = require('../services/cadexFactory');
const chalk = require('chalk');
const Cadex = require('../models/cadex');
const Names = require('../models/names');
const Adjectives = require('../models/adjectives');
const Verbs = require('../models/verbs');
const Complements = require('../models/complements');


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
    getCadex: async (req, res) => {

        // je génére une copie de mon cadex et req.query peut contenir des morceaux de cadex décidé par l'utilisateur. 
        // potentiellement un verb, un name, un adjective, un complement
        // Et si il y a deux clés identiques, la deuxieme écrasse la premiére, celle donné par l'utilisateur prend donc le dessus !

        // Dans le cas ou un utilisateur essaie d'altérer ma méthode glue..
        delete req.query.glue;

        if (req.query.hasOwnProperty('name')) {
            //TODO 
            //! inséré en BDD les propositions soumis par les utilisateurs !
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

        //exemple de format urlencoded pour insérer des données : https://localhost:4000/api/v1/cadex?name=Jean%20Castex&verb=licencie&complement=un%20poney%20Shetland

        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.query
        };

        // je vérifis si se nouveau cadex existe déja en BDD si oui je ne l'insére pas dans la bdd, si non, je l'insére !
        let allCadex;
        try {
            allCadex = await Cadex.findAll();
        } catch (error) {
            console.log(`Erreur lors de la récupération de tous les cadex dans cadexController : `, error);
            return res.status(500).end
        }

        let arrayCadex = [];

        // si il n'y a pas de cadex déja présent en BDD ou que le included donne false quand on cherche le nouveau cadex parmis ceux existant, on envoie le nouveau cadex en BDD !

        if (allCadex === null) {

            const data = {};
            data.cadex = baseCadex.glue();
            const newCadex = new Cadex(data);
            const monCadex = await newCadex.save();
            console.log(chalk.black.bgBlue `Un cadex a été envoyé en BDD =>`, chalk.black.bgGreen `${monCadex.cadex}`);

        } else if (allCadex !== null) {

            for (const item of allCadex) {
                arrayCadex.push(item.cadex);
            }

            if (arrayCadex.includes((baseCadex.glue())) === false) {

                const data = {};
                data.cadex = baseCadex.glue();
                const newCadex = new Cadex(data);
                const monCadex = await newCadex.save();
                console.log(chalk.black.bgBlue `Un cadex a été envoyé en BDD =>`, chalk.black.bgGreen `${monCadex.cadex}`);

            } else {
                console.log(chalk.grey `Aucun cadex inséré en BDD, celui-çi était déja présent...`);
            }

        }

        // je renvoie le cadex au front
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

        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.body
        }; // Je renvoie un cadex avec les propositions de l'utilisateur...

        res.status(200).json(baseCadex.glue());

    }



}

module.exports = cadexController;