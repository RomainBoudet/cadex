// on utilise le DP Factory, on retourne un objet.

const Names = require('../models/names');
const Adjectives = require('../models/adjectives');
const Verbs = require('../models/verbs');
const Complements = require('../models/complements');

let names;
let adjectives;
let verbs;
let complements;

let arrayNames=[];
let arrayAdjectives=[];
let arrayVerbs=[];
let arrayComplements=[];


// mon inflecteur
const pluralize = require('pluralize');

// Je récupére mes données depuis ma bdd. Je les stock dans des tableaux.
let getData;
(getData = async (req, res) => {
    try {
        names = await Names.findAll();
        names.map((item) => arrayNames.push(item.names));

    } catch (error) {
       return  console.log(`Erreur dans la methode data / names du service cadexFactory ${error.message}`);
    };

    try {
        adjectives = await Adjectives.findAll();
        adjectives.map((item) => arrayAdjectives.push(item.adjectives));

    } catch (error) {
        return console.log(`Erreur dans la methode data / adjectives du service cadexFactory ${error.message}`);
    };

    try {
        verbs = await Verbs.findAll();
        verbs.map((item) => arrayVerbs.push(item.verbs));

    } catch (error) {
        return console.log(`Erreur dans la methode data / verbs du service cadexFactory ${error.message}`);
    };

    try {
        complements = await Complements.findAll();
        complements.map((item) => arrayComplements.push(item.complements));

    } catch (error) {
        return console.log(`Erreur dans la methode data / complements du service cadexFactory ${error.message}`);
    };

})();

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
    add: proposition => {
        for (let type in proposition) { // si il existe verbs dans data, on va le rechercher et l'ajouter a l'objet.
            if (cadexFactory.data[pluralize(type)]) { // je met tous au pluriel via un inflecteur car les propriétées de mon objet data sont au pluriel ! 
                cadexFactory.data[pluralize(type)].push(proposition[type]);
            }
        }
    }
};

module.exports = cadexFactory;