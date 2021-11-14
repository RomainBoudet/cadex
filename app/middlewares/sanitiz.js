const validator = require('validator');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();


/**
 * sanitizer Middleware
 * @module middleware/clean
 * 
 */
const cleanQuery = (req, res, next) => {

    try {
        //On boucle sur chaque propriétées de query et on supprime tous caractéres interdit ! 
        // blacklist porte bien son nom et trim supprime les espaces avant et apres.https://www.npmjs.com/package/validator
        // j'aurais bien mis un tableau de caractéres comme ceci: ['>','<', '&', '"', '/', '|', '#', '{', '}','='] mais blacklist me prend aussi la virgule que je veux garder...
        //a l'avenir, une regex serait peut être préférable plutot qu'un module entrainant un package en plus avec ses potentielles failles...
        //a l'avenir il faudrait également logger les cas ou on a tenté d'insérer des caractéres spéciaux.

        const theQuery = req.query;

        for (let prop in theQuery) {
            theQuery[prop] = validator.blacklist(theQuery[prop], ['>']);
            //theQuery[prop] = validator.blacklist(theQuery[prop], [' ']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['<']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['&']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['"']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['/']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['|']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['#']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['{']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['}']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['[']);
            theQuery[prop] = validator.blacklist(theQuery[prop], [']']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['=']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['*']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['$']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['%']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['_']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['+']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['(']);
            theQuery[prop] = validator.blacklist(theQuery[prop], [')']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['@']);
            theQuery[prop] = validator.blacklist(theQuery[prop], ['~']);
            theQuery[prop] = validator.blacklist(theQuery[prop], '\\[\\]');

            theQuery[prop] = validator.trim(theQuery[prop]);

            if (!(validator.isLength(theQuery[prop], {
                    min: 2,
                    max: 150
                }))) {

                delete theQuery[prop];

            }
        }

        next();

    } catch (err) {

        console.trace(
            'Erreur dans la méthode clean du sanitizer :',
            err);

        return res.status(500).json({
            message: 'Erreur dans le sanitizer'
        });

    }

}

module.exports = {
    cleanQuery,
};