
const {Router} = require ('express');

const cadexController = require('./controllers/cadexController');

const router = Router();
const {cleanQuery} = require('./middlewares/sanitiz');

/**
 * Génère un Cadex de manière aléatoire, avec la possibilité de fournir des segments de phrase
 * @route GET /cadex
 * @group Cadex - génération de cadavre exquis
 * @param {string} name.query - le nom qu'on peut fournir
 * @param {string} adjective.query - l'adjectif qu'on peut fournir
 * @param {string} verb.query - le verbe qu'on peut fournir
 * @param {string} complement.query - le complément qu'on peut fournir
 * @returns {string} 200 - le cadavre exquis généré
 */
router.get('/cadex', cleanQuery, cadexController.getCadex);

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
router.post('/cadex', cadexController.addproposition);

module.exports = router;