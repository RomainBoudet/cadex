const validator = require('validator');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();


/**
 * sanitizer Middleware
 * @module middleware/clean
 * 
 */
const clean = (req, res, next) => {

    try {
        //On boucle sur chaque propriétées de query et on supprime tous caractéres interdit ! 
        // blacklist porte bien son nom et trim supprime les espaces avant et apres.https://www.npmjs.com/package/validator
        // j'aurais bien mis un tableau de caractéres comme ceci: ['>','<', '&', '"', '/', '|', '#', '{', '}','='] mais blacklist me prend aussi la virgule que je veux garder...
        //a l'avenir, une regex serait peut être préférable plutot qu'un module entrainant un package en plus avec ses potentielles failles...
        //a l'avenir il faudrait également logger les cas ou on a tenté d'insérer des caractéres spéciaux.

        if (Object.keys(req.query).length > 0) {
            const theQuery = req.query;
            console.log('on passe !!! query');
            for (let prop in theQuery) {

                //J'interdis tout caractéres spéciaux !

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

                // j'enléve les espaces avant et aprés..
                theQuery[prop] = validator.trim(theQuery[prop]);

                // Je reduit également chaque entrée a un maximum de 150 caractéres...
                if (!(validator.isLength(theQuery[prop], {
                        min: 2,
                        max: 150
                    }))) {

                    delete theQuery[prop];

                }
            }
        };

        if (Object.keys(req.body).length > 0) {
        const theBody = req.body;

        for (let prop in theBody) {

            //J'interdis tout caractéres spéciaux !

            theBody[prop] = validator.blacklist(theBody[prop], ['>']);
            //theBody[prop] = validator.blacklist(theBody[prop], [' ']);
            theBody[prop] = validator.blacklist(theBody[prop], ['<']);
            theBody[prop] = validator.blacklist(theBody[prop], ['&']);
            theBody[prop] = validator.blacklist(theBody[prop], ['"']);
            theBody[prop] = validator.blacklist(theBody[prop], ['/']);
            theBody[prop] = validator.blacklist(theBody[prop], ['|']);
            theBody[prop] = validator.blacklist(theBody[prop], ['#']);
            theBody[prop] = validator.blacklist(theBody[prop], ['{']);
            theBody[prop] = validator.blacklist(theBody[prop], ['}']);
            theBody[prop] = validator.blacklist(theBody[prop], ['[']);
            theBody[prop] = validator.blacklist(theBody[prop], [']']);
            theBody[prop] = validator.blacklist(theBody[prop], ['=']);
            theBody[prop] = validator.blacklist(theBody[prop], ['*']);
            theBody[prop] = validator.blacklist(theBody[prop], ['$']);
            theBody[prop] = validator.blacklist(theBody[prop], ['%']);
            theBody[prop] = validator.blacklist(theBody[prop], ['_']);
            theBody[prop] = validator.blacklist(theBody[prop], ['+']);
            theBody[prop] = validator.blacklist(theBody[prop], ['(']);
            theBody[prop] = validator.blacklist(theBody[prop], [')']);
            theBody[prop] = validator.blacklist(theBody[prop], ['@']);
            theBody[prop] = validator.blacklist(theBody[prop], ['~']);
            theBody[prop] = validator.blacklist(theBody[prop], '\\[\\]');

            // j'enléve les espaces avant et aprés..
            theBody[prop] = validator.trim(theBody[prop]);

            // Je reduit également chaque entrée a un maximum de 150 caractéres...
            if (!(validator.isLength(theBody[prop], {
                    min: 2,
                    max: 150
                }))) {

                delete theBody[prop];

            }
        }};


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
    clean,
};