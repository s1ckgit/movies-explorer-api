const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/userValidation');

router.get('/me', getUserInfo);

router.patch('/me', updateUserValidation, updateUserInfo);

module.exports = router;
