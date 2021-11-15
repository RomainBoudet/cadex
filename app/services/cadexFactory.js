// on utilise le DP Factory, on retourne un objet.

const chalk = require('chalk');

const Names = require('../models/names');
const Adjectives = require('../models/adjectives');
const Verbs = require('../models/verbs');
const Complements = require('../models/complements');

let names;
let adjectives;
let verbs;
let complements;

let arrayNames = [];
let arrayAdjectives = [];
let arrayVerbs = [];
let arrayComplements = [];

// Je récupére mes données depuis ma bdd. Je les stock dans des tableaux.

const getData = async () => {
    try {
        names = await Names.findAll();

        //SI arrayNames ne contient pas l'item,  on le met dans le tableau !
        for (const item of names) {
            if (!arrayNames.includes(item.names)) {
                arrayNames.push(item.names);
            }
        }

    } catch (error) {
        return console.log(`Erreur dans la methode data / names du service cadexFactory ${error.message}`);
    };

    try {
        adjectives = await Adjectives.findAll();
        for (const item of adjectives) {
            if (!arrayAdjectives.includes(item.adjectives)) {
                arrayAdjectives.push(item.adjectives);
            }
        }
    } catch (error) {
        return console.log(`Erreur dans la methode data / adjectives du service cadexFactory ${error.message}`);
    };

    try {
        verbs = await Verbs.findAll();
        for (const item of verbs) {
            if (!arrayVerbs.includes(item.verbs)) {
                arrayVerbs.push(item.verbs);
            }
        }
    } catch (error) {
        return console.log(`Erreur dans la methode data / verbs du service cadexFactory ${error.message}`);
    };

    try {
        complements = await Complements.findAll();
        for (const item of complements) {
            if (!arrayComplements.includes(item.complements)) {
                arrayComplements.push(item.complements);
            }
        }
    } catch (error) {
        return console.log(`Erreur dans la methode data / complements du service cadexFactory ${error.message}`);
    };

};
getData();

// Une fonction qui choisit un chiffre aléatoire entre min et max
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Une fonction qui prend un index aléatoire dans un tableau
const randomInArray = array => {
    return array[random(0, array.length)];
};

const cadexFactory = {


    randomName: () => randomInArray(arrayNames),
    randomAdjective: () => randomInArray(arrayAdjectives),
    randomVerb: () => randomInArray(arrayVerbs),
    randomComplement: () => randomInArray(arrayComplements),

    generate: () => {

        getData();

        return {
            name: cadexFactory.randomName(),
            adjective: cadexFactory.randomAdjective(),
            verb: cadexFactory.randomVerb(),
            complement: cadexFactory.randomComplement(),

            // on oublie pas, pas de fat arrow avec this, sinon on ne peut pas associer this comme étant l'objet courant ! Fat arrow ne redéfinit pas le contexte.
            glue: function () {
                
                return [this.name, this.adjective, this.verb, this.complement].join(' ');
            }
        }

    },

    /**
     * Ajoute des propositions à celles disponibles dans la propriété data
     * @param {Cadex} propositions - les propositions à ajouter
     */
    add: async proposition => {

        if (proposition.hasOwnProperty('name')) {
            let name;
            try {
                name = await Names.findOne(proposition.name);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode add du cadexFactory pour le recherche de nom ${error.message}`);
            }; 
            if (name === null) {

                const data = {};
                data.names = proposition.name;
                const newName = new Names(data);
                const monName = await newName.save();
                console.log(chalk.black.bgBlue `Un nom a été envoyé en BDD =>`, chalk.black.bgGreen `${monName.names}`);
    
            } else {
                console.log(chalk.grey `Aucun name inséré en BDD, celui-çi était déja présent...`);
            }
        }

        if (proposition.hasOwnProperty('verb')) {
            let verb;
            try {
                verb = await Verbs.findOne(proposition.verb);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode add du cadexFactory pour le recherche de verb ${error.message}`);
            }; 
            if (verb === null) {

                const data = {};
                data.verbs = proposition.verb;
                const newVerb = new Verbs(data);
                const monVerb = await newVerb.save();
                console.log(chalk.black.bgBlue `Un verbe a été envoyé en BDD =>`, chalk.black.bgGreen `${monVerb.verbs}`);
    
            } else {
                console.log(chalk.grey `Aucun verb inséré en BDD, celui-çi était déja présent...`);
            }
        }
        if (proposition.hasOwnProperty('complement')) {
            let complement;
            try {
                complement = await Complements.findOne(proposition.complement);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode add du cadexFactory pour le recherche de complement ${error.message}`);
            }; 
            if (complement === null) {

                const data = {};
                data.complements = proposition.complement;
                const newComplement = new Complements(data);
                const monComplement = await newComplement.save();
                console.log(chalk.black.bgBlue `Un complement a été envoyé en BDD =>`, chalk.black.bgGreen `${monComplement.complements}`);
    
            } else {
                console.log(chalk.grey `Aucun complement inséré en BDD, celui-çi était déja présent...`);
            }
        }
        if (proposition.hasOwnProperty('adjective')) {
            let adjective;
            try {
                adjective = await Adjectives.findOne(proposition.adjective);
            } catch (error) {
                return console.log(chalk.black.bgRed `Erreur dans la methode add du cadexFactory pour le recherche de adjective ${error.message}`);
            }; 
            if (adjective === null) {

                const data = {};
                data.adjectives = proposition.adjective;
                const newAdjective = new Adjectives(data);
                const monAdjective = await newAdjective.save();
                console.log(chalk.black.bgBlue `Un adjectif a été envoyé en BDD =>`, chalk.black.bgGreen `${monAdjective.adjectives}`);
    
            } else {
                console.log(chalk.grey `Aucun adjective inséré en BDD, celui-çi était déja présent...`);
            }
        }
    }
};

module.exports = cadexFactory;