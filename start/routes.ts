import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';
const UsersController = () => import('#controllers/users_controller');
const ChatController = () => import('#controllers/chat_controller');

router.on('/').renderInertia('home');

router
  .group(() => {
    router.get('/chat/:targetId?', [ChatController, 'showChat']);
    router.post('/chat/:targetId', [ChatController, 'sendMessage']);

    router.post('/logout', [UsersController, 'logout']);
  })
  .middleware([middleware.auth()]);

router
  .group(() => {
    router.get('/login', [UsersController, 'showLoginForm']);
    router.get('/signin', [UsersController, 'showSigninForm']);

    router.post('/login', [UsersController, 'login']);
    router.post('/signin', [UsersController, 'signin']);
  })
  .middleware([middleware.guest()]);
