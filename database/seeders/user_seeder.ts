import User from '#models/user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { faker } from '@faker-js/faker';

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'Sonny93',
        email: 'myemail@gmail.com',
        password: 'a12345678',
        avatar: faker.image.urlLoremFlickr({ height: 128, width: 128 }),
      },
      {
        username: 'AnotherUser',
        email: 'test@test.test',
        password: 'test@test.test',
        avatar: faker.image.urlLoremFlickr({ height: 128, width: 128 }),
      },
      {
        username: 'AnotherUser2',
        email: 'test2@test.test',
        password: 'test2@test.test',
        avatar: faker.image.urlLoremFlickr({ height: 128, width: 128 }),
      },
    ]);
  }
}
