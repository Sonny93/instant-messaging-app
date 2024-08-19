import vine from '@vinejs/vine';

export const messageForm = vine.compile(
  vine.object({
    content: vine.string().minLength(1),
    params: vine.object({
      targetId: vine.number(),
    }),
  })
);
