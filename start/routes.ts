import router from '@adonisjs/core/services/router';
const UsersController = () => import('#controllers/users_controller');

router.on('/').renderInertia('home', { version: 6 });

router.get('/login', [UsersController, 'showLoginForm']);
router.get('/signin', [UsersController, 'showSigninForm']);

router.post('/login', [UsersController, 'login']);
router.post('/signin', [UsersController, 'signin']);
router.post('/logout', [UsersController, 'logout']);
