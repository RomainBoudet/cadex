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

        // Dans le cas ou un utilisateur essaie d'altérer ma méthode glue..
        delete req.query.glue;

        // J'insére en bdd les proposition des utilisateurs
        // je vérifis avant l'insertion que le mot proposé n'existe pas déja
        if (req.query.hasOwnProperty('name')) {
            let name;
            try {
                name = await Names.findOne(req.query.name);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode data / names du service getData ${error.message}`);
            }; 
            if (name === null) {

                const data = {};
                data.names = req.query.name;
                const newName = new Names(data);
                const monName = await newName.save();
                console.log(chalk.black.bgBlue `Un nom a été envoyé en BDD =>`, chalk.black.bgGreen `${monName.names}`);
    
            } else {
                console.log(chalk.grey `Aucun name inséré en BDD, celui-çi était déja présent...`);
            }
        }

        if (req.query.hasOwnProperty('verb')) {
            let verb;
            try {
                verb = await Verbs.findOne(req.query.verb);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode data / verbs du service getData ${error.message}`);
            }; 
            if (verb === null) {

                const data = {};
                data.verbs = req.query.verb;
                const newVerb = new Verbs(data);
                const monVerb = await newVerb.save();
                console.log(chalk.black.bgBlue `Un verbe a été envoyé en BDD =>`, chalk.black.bgGreen `${monVerb.verbs}`);
    
            } else {
                console.log(chalk.grey `Aucun verb inséré en BDD, celui-çi était déja présent...`);
            }
        }
        if (req.query.hasOwnProperty('complement')) {
            let complement;
            try {
                complement = await Complements.findOne(req.query.complement);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode data / complements du service getData ${error.message}`);
            }; 
            if (complement === null) {

                const data = {};
                data.complements = req.query.complement;
                const newComplement = new Complements(data);
                const monComplement = await newComplement.save();
                console.log(chalk.black.bgBlue `Un complement a été envoyé en BDD =>`, chalk.black.bgGreen `${monComplement.complements}`);
    
            } else {
                console.log(chalk.grey `Aucun complement inséré en BDD, celui-çi était déja présent...`);
            }
        }
        if (req.query.hasOwnProperty('adjective')) {
            let adjective;
            try {
                adjective = await Adjectives.findOne(req.query.adjective);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode data / adjectives du service getData ${error.message}`);
            }; 
            if (adjective === null) {

                const data = {};
                data.adjectives = req.query.adjective;
                const newAdjective = new Adjectives(data);
                const monAdjective = await newAdjective.save();
                console.log(chalk.black.bgBlue `Un adjectif a été envoyé en BDD =>`, chalk.black.bgGreen `${monAdjective.adjectives}`);
    
            } else {
                console.log(chalk.grey `Aucun adjective inséré en BDD, celui-çi était déja présent...`);
            }
        }

        //exemple de format urlencoded pour insérer des données : https://localhost:4000/api/v1/cadex?name=Jean%20Castex&verb=licencie&complement=un%20poney%20Shetland


        // je génére une copie de mon cadex et req.query peut contenir des morceaux de cadex décidé par l'utilisateur. 
        // potentiellement un verb, un name, un adjective, un complement
        // Et si il y a deux clés identiques, la deuxieme écrasse la premiére, celle donné par l'utilisateur prend donc le dessus !
        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.query
        };

        // je vérifis si ce nouveau cadex existe déja en BDD si oui je ne l'insére pas dans la bdd, si non, je l'insére !
        let oneCadex;
        try {
            oneCadex = await Cadex.findOne(baseCadex.glue());
        } catch (error) {
            console.log(`Erreur lors de la récupération de tous les cadex dans cadexController : `, error);
            return res.status(500).end
        }

        // si il n'y a pas de cadex déja présent en BDD ou que le included donne false quand on cherche le nouveau cadex parmis ceux existant, on envoie le nouveau cadex en BDD !

        if (oneCadex === null) {

            const data = {};
            data.cadex = baseCadex.glue();
            const newCadex = new Cadex(data);
            const monCadex = await newCadex.save();
            console.log(chalk.black.bgBlue `Un cadex a été envoyé en BDD =>`, chalk.black.bgGreen `${monCadex.cadex}`);

        } else {
            console.log(chalk.grey `Aucun cadex inséré en BDD, celui-çi était déja présent...`);
        }

        // je renvoie le cadex au front
        res.status(200).json({cadex:baseCadex.glue(), info:"You can add verb, complement, adjective and name in JSON or urlencoded format in post request to https://thedev.fr/api/v1/cadex "});
    },


    // 
    /**
     * Une méthode pour insérer des propostions de nom / verbe / adjectif ou complément a la factory
     * Retourne égalementun cadavre exquis utilidant les nouvelles propositions
     * @param {Express.Request} req - l'objet représentant la requête
     * @param {Express.Response} res - l'objet représentant la réponse
     */
    addproposition: (req, res) => {

        cadexFactory.add(req.body);

        delete req.body.glue; // Petite sécurité..

        const baseCadex = {
            ...cadexFactory.generate(),
            ...req.body
        }; // Je renvoie un cadex avec les propositions de l'utilisateur...

        res.status(200).json({cadex:baseCadex.glue(), info:"You can add verb, complement, adjective and name in urlencoded format, directly with your browser in get request to https://localhost:4000/api/v1/cadex "});

    }



}

module.exports = cadexController;