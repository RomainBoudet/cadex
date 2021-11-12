// on utilise le DP Factory, on retourne un objet.


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

       return  {
            name: cadexFactory.randomName(),
            adjective: cadexFactory.randomAdjective(),
            verb: cadexFactory.randomVerb(),
            complement: cadexFactory.randomComplement(),

            // on oublie pas, pas fat arrow avec this, sinon on ne peut pas associer this comme étant l'objet courant ! Fat arrow ne redéfinit pas le contexte.
            glue: function() {
                return [this.name, this.adjective, this.verb, this.complement].join(' ');
            }
        }
      
    }
};

module.exports = cadexFactory;

