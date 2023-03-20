const Router = require('express')
const router = new Router();
const sellController = require('../controllers/sell.controller')


router.post('/sell', sellController.createSell)

module.exports = router
