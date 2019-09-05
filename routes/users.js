const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.uri = '/users';

router.get('/', UserController.index);
router.get('/create', UserController.create);
router.post('/', UserController.store);
router.get('/:id/edit', UserController.edit);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
