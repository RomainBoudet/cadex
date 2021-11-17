const {
    Router
} = require('express');

const cadexController = require('./controllers/cadexController');


const router = Router();
const {
    clean
} = require('./middlewares/sanitiz');

// Config du module pour limiter le nombre de connexion sur une route
// Basé sur l'ip
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 3600 * 1000 * 24, // la fenetre de tir pour le nombre de connexion : 24h
    message: 'Looks like you\'re a little too greedy ! You have exceeded the limit of 1000 requests for an cadavre exquis in 24 hours.',
    max: 1000, //le nombre de connexion max pour la fenetre donnée.
});


/**
 * Génère un Cadex de manière aléatoire, avec la possibilité de fournir des segments de phrase
 * Toute donnée fournie en query avec un caractére interdit sera supprimé => [<>{}_*+$%#()=@&~/\|]
 * @route GET /cadex
 * @group Cadex - génération de cadavre exquis
 * @param {string} name.query - le nom qu'on peut fournir
 * @param {string} adjective.query - l'adjectif qu'on peut fournir
 * @param {string} verb.query - le verbe qu'on peut fournir
 * @param {string} complement.query - le complément qu'on peut fournir
 * @returns {string} 200 - le cadavre exquis généré
 */
router.get('/cadex', apiLimiter, clean, cadexController.getCadex);

/**
 * Ajoute des propositions de segments de phrase et génère un Cadex basé sur les segments fournis
 * @route POST /cadex
 * @group Cadex - génération de cadavre exquis
 * @param {string} name.body - le nom qu'on peut fournir
 * @param {string} adjective.body - l'adjectif qu'on peut fournir
 * @param {string} verb.body - le verbe qu'on peut fournir
 * @param {string} complement.body - le complément qu'on peut fournir
 * @returns {string} 200 - le cadavre exquis généré
 */
router.post('/cadex', apiLimiter, clean, cadexController.addproposition);


module.exports = router;