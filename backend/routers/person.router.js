const Router = require('express')
const router = new Router();
const personController = require('../controllers/person.controller')


router.post('/person', personController.createPerson)
router.get('/person', personController.getPersons)
router.get('/person/:id', personController.getOnePerson)

module.exports = router
