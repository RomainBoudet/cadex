
const {Router} = require ('express');

const router = Router();

router.get('/cadex', (req, res) => {res.send('hello World')} );

module.exports = router;