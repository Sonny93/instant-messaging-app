import vine from '@vinejs/vine';

export const userLogin = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim(),
  })
);
