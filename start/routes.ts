import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';
const UsersController = () => import('#controllers/users_controller');
const ChatController = () => import('#controllers/chat_controller');

router.on('/').renderInertia('home');

router
  .group(() => {
    router
      .get('/chat/:targetId?', [ChatController, 'showChat'])
      .as('chat.show');
    router
      .post('/chat/:targetId', [ChatController, 'sendMessage'])
      .as('chat.send');

    router.post('/logout', [UsersController, 'logout']).as('auth.logout');
  })
  .middleware([middleware.auth()]);

router
  .group(() => {
    router
      .get('/login', [UsersController, 'showLoginForm'])
      .as('auth.form.login');
    router
      .get('/signin', [UsersController, 'showSigninForm'])
      .as('auth.form.signin');

    router.post('/login', [UsersController, 'login']).as('auth.api.login');
    router.post('/signin', [UsersController, 'signin']).as('auth.api.signin');
  })
  .middleware([middleware.guest()]);
