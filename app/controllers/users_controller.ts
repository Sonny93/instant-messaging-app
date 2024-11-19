import type { HttpContext } from '@adonisjs/core/http';
import { faker } from '@faker-js/faker';

import User from '#models/user';
import { userLogin } from '#validators/user_login';
import { userSignin } from '#validators/user_signin';

export default class UsersController {
  showLoginForm({ inertia }: HttpContext) {
    return inertia.render('login');
  }

  showSigninForm({ inertia }: HttpContext) {
    return inertia.render('signin');
  }

  async signin({ request, response, auth }: HttpContext) {
    const user = await request.validateUsing(userSignin);
    const createdUser = await User.create({
      ...user,
      avatar: faker.image.urlLoremFlickr({ height: 128, width: 128 }),
    });
    await auth.use('web').login(createdUser);
    response.redirect('/');
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(userLogin);
    const user = await User.verifyCredentials(email, password);
    await auth.use('web').login(user);
    response.redirect('/');
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout();
    response.redirect('/');
  }
}
