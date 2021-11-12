
const {Router} = require ('express');

const cadexController = require('./controllers/cadexController');

const router = Router();

router.get('/cadex', cadexController.getCadex);

module.exports = router;