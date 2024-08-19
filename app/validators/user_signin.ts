import vine from '@vinejs/vine';

export const userSignin = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4),
    email: vine.string().email().trim(),
    password: vine.string().trim().confirmed(), // need to send password_confirmation
  })
);
