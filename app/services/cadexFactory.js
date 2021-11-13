// on utilise le DP Factory, on retourne un objet.

// mon inflecteur
const pluralize = require('pluralize');

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const randomInArray = array => {
    return array[random(0, array.length)];
};

const cadexFactory = {

    data: require('../../data/parts.json'),

    randomName: () => randomInArray(cadexFactory.data.names),
    randomAdjective: () => randomInArray(cadexFactory.data.adjectives),
    randomVerb: () => randomInArray(cadexFactory.data.verbs),
    randomComplement: () => randomInArray(cadexFactory.data.complements),

    generate: () => {

        return {
            name: cadexFactory.randomName(),
            adjective: cadexFactory.randomAdjective(),
            verb: cadexFactory.randomVerb(),
            complement: cadexFactory.randomComplement(),

            // on oublie pas, pas fat arrow avec this, sinon on ne peut pas associer this comme étant l'objet courant ! Fat arrow ne redéfinit pas le contexte.
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