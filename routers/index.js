const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const signInValidation = require('../middlewares/signInValidation');
const signUpValidation = require('../middlewares/signUpValidation');
const NotFoundError = require('../errors/NotFound');

router.post('/signin', signInValidation, loginUser);
router.post('/signup', signUpValidation, createUser);
router.post('/signout', logoutUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
