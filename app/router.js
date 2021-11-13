
const {Router} = require ('express');

const cadexController = require('./controllers/cadexController');

const router = Router();

router.get('/cadex', cadexController.getCadex);

router.post('/cadex', cadexController.addproposition);

module.exports = router;